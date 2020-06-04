import BuyRequest from "../Database/models/BuyRequest";
import SellRequest from "../Database/models/SellRequest";

class Phone {
  static welcome(req, res) {
    res.status(200).json({ message: "Welcome to Phone" });
  }

  static async getAllPhones(req, res) {
    const { type, limit, page, name, condition, storage, min, max } = req.query;
    const queryObject = {
      phone_name: new RegExp(`^${name}$`, "i"),
      condition: new RegExp(`^${condition}$`, "i"),
      storage: new RegExp(`^${storage}$`, "i"),
      price: { $gte: min, $lte: max },
    };

    const query = (queryObject) => {
      const removeUndefined = Object.entries(queryObject).reduce(
        (checkObject, [key, value]) =>
          value.toString() === "/^undefined$/i"
            ? checkObject
            : ((checkObject[key] = value), checkObject),
        {}
      );
      if (removeUndefined.price["$gte"] === undefined) {
        delete removeUndefined.price;
      }
      return removeUndefined;
    };

    const options = {
      page: page || 1,
      limit: limit || 5,
    };
    const getPhone = {
      buyer: await BuyRequest.paginate(query(queryObject), options),
      seller: await SellRequest.paginate(query(queryObject), options),
    };

    const getCars = await getPhone[type];

    res.status(200).json({
      message: "success",
      type,
      getCars,
    });
  }

  // static async searchCars(req, res) {
  //   const { start, end, gender, countries, color } = req.query;
  //   try {
  //     const carResults = await models.Car.findAll({
  //       where: {
  //         car_model_year: {
  //           [Op.between]: [start, end],
  //         },
  //         gender: `${gender}`,
  //         car_color: { [Op.iLike]: `%${color}%` },
  //         country: { [Op.iLike]: `%${countries}%` },
  //       },
  //       order: [["createdAt", "DESC"]],
  //     });
  //     return res.status(200).json({ message: "Success", carResults });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({ message: "Fail", error });
  //   }
  // }
}

export default Phone;
