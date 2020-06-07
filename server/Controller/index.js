import BuyRequest from "../Database/models/BuyRequest";
import SellRequest from "../Database/models/SellRequest";

class Phone {
  static welcome(req, res) {
    res.status(200).json({ message: "Welcome to Phone" });
  }

  static async getAllPhones(req, res) {
    const { type, limit, page, min, max, searchString } = req.query;
    const options = {
      page: Number(page) || 1,
      limit: Number(limit) || 5,
    };

    const query = {
      price: { $gte: min, $lte: max },
    };

    if (query.price["$gte"] === undefined) delete query.price;

    const searchFunction = async (searchPhrase, type) => {
      const getPhone = {
        buyer:  BuyRequest,
        seller:  SellRequest,
      };

      const search = await getPhone[type].find(
        { $text: { $search: searchString } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .skip(options.page * options.limit)
        .limit(options.limit);

      const total = await getPhone[type].countDocuments();
      return {
        docs: search,
        totalPages: total / limit,
        searchPhrase: searchPhrase,
        limit: limit,
        page: page,
        totalDocs: total,
      };
    };

    const getPhone = {
      buyer: await BuyRequest.paginate(query, options),
      seller: await SellRequest.paginate(query, options),
    };

    const phones = await getPhone[type];

    const phoneData = searchString
      ? await searchFunction(searchString, type)
      : phones;

    res.status(200).json({
      message: "success",
      type,
      phones: phoneData,
    });
  }
}

export default Phone;
