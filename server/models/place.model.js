import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: {
    common: String,
    official: String,
    nativeName: {
      type: Map,
      of: { official: String, common: String },
    },
  },
  tld: [String],
  cca2: String,
  ccn3: String,
  cca3: String,
  cioc: String,
  independent: Boolean,
  status: String,
  unMember: Boolean,
  currencies: { type: Map, of: { name: String, symbol: String } },
  idd: { root: String, suffixes: [String] },
  capital: [String],
  altSpellings: [String, String, String, String, String],
  region: String,
  subregion: String,
  languages: { type: Map, of: String },
  translations: {
    type: Map,
    of: { official: String, common: String },
  },
  latlng: [Number],
  landlocked: Boolean,
  borders: [String, String, String, String],
  area: Number,
  demonyms: { type: Map, of: { f: String, m: String } },
  flag: String,
  maps: { type: Map, of: String },
  population: Number,
  gini: { String },
  fifa: String,
  car: { type: Map, of: { signs: [String], side: String } },
  timezones: [String],
  continents: [String],
  flags: { type: Map, of: { png: String, svg: String } },
  coatOfArms: { type: Map, of: { png: String, svg: String } },
  startOfWeek: String,
  capitalInfo: { type: Map, of: [Number] },
  postalCode: { type: Map, of: { format: String, regex: String } },
});

const Place = mongoose.model("Place", PlaceSchema);

export default Place;
