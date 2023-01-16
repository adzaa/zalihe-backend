import Sirovina from "../models/SirovinaModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getSirovine = async (req, res) => {
  try {
    const response = await Sirovina.findAll({
      attributes: [
        "uuid",
        "name",
        "kolicina",
        "min_kolicina",
        "cijena",
        "jedinica_mjere",
        "da_li_se_koristi",
        "dobavljac_id",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSirovinaById = async (req, res) => {
  try {
    const response = await Sirovina.findOne({
      attributes: [
        "uuid",
        "name",
        "kolicina",
        "min_kolicina",
        "cijena",
        "jedinica_mjere",
        "da_li_se_koristi",
        "dobavljac_id",
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSirovina = async (req, res) => {
  const {
    name,
    kolicina,
    min_kolicina,
    cijena,
    jedinica_mjere,
    da_li_se_koristi,
    dobavljac_id,
  } = req.body;
  try {
    await Sirovina.create({
      name: name,
      kolicina: kolicina,
      min_kolicina: min_kolicina,
      cijena: cijena,
      jedinica_mjere: jedinica_mjere,
      da_li_se_koristi: da_li_se_koristi,
      dobavljac_id: dobavljac_id,
    });
    res.status(201).json({ msg: "Sirovina dodana" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateSirovina = async (req, res) => {
  const sirovina = await Sirovina.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  const {
    name,
    kolicina,
    min_kolicina,
    cijena,
    jedinica_mjere,
    da_li_se_koristi,
    dobavljac_id,
  } = req.body;
  try {
    await Sirovina.update(
      {
        name: name,
        kolicina: kolicina,
        min_kolicina: min_kolicina,
        cijena: cijena,
        jedinica_mjere: jedinica_mjere,
        da_li_se_koristi: da_li_se_koristi,
        dobavljac_id: dobavljac_id,
      },
      {
        where: {
          id: sirovina.id,
        },
      }
    );
    res.status(200).json({ msg: "Sirovina ažurirana" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteSirovina = async (req, res) => {
  try {
    const sirovina = await Sirovina.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!sirovina)
      return res.status(404).json({ msg: "Sirovina nije pronađena" });
    const {
      name,
      kolicina,
      min_kolicina,
      cijena,
      jedinica_mjere,
      da_li_se_koristi,
      dobavljac_id,
    } = req.body;
    if (req.role === "admin") {
      await Sirovina.destroy({
        where: {
          id: sirovina.id,
        },
      });
    } else {
      if (req.userId !== sirovina.userId)
        return res.status(403).json({ msg: "Zabranjen pristup" });
      await Sirovina.destroy({
        where: {
          [Op.and]: [{ id: sirovina.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Sirovina izbrisana" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
