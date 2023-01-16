import Supplier from "../models/SupplierModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getSuppliers = async (req, res) => {
  try {
    const response = await Supplier.findAll({
      attributes: ["uuid", "name", "email", "jib", "broj", "osoba", "datump"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const response = await Supplier.findOne({
      attributes: ["uuid", "name", "email", "jib", "broj", "osoba", "datump"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSupplier = async (req, res) => {
  const { name, email, broj, osoba, jib, datump } = req.body;
  try {
    await Supplier.create({
      name: name,
      email: email,
      broj: broj,
      osoba: osoba,
      jib: jib,
      datump: datump,
    });
    res.status(201).json({ msg: "Dobavljač dodan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  const supplier = await Supplier.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  const { name, email, broj, osoba, jib, datump } = req.body;
  try {
    await Supplier.update(
      {
        name: name,
        email: email,
        broj: broj,
        osoba: osoba,
        jib: jib,
        datump: datump,
      },
      {
        where: {
          id: supplier.id,
        },
      }
    );
    res.status(200).json({ msg: "Dobavljač ažuriran" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!supplier)
      return res.status(404).json({ msg: "Dobavljač nije pronađen" });
    const { name, email, broj, osoba, jib, datump } = req.body;
    if (req.role === "admin") {
      await Supplier.destroy({
        where: {
          id: supplier.id,
        },
      });
    } else {
      if (req.userId !== supplier.userId)
        return res.status(403).json({ msg: "Zabranjen pristup" });
      await Supplier.destroy({
        where: {
          [Op.and]: [{ id: supplier.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Dobavljač izbrisan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
