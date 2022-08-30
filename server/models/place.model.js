import mongoose from 'mongoose';

const { Schema } = mongoose;

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
  currencies: { KWD: { name: String, symbol: String } },
  idd: { root: String, suffixes: [String] },
  capital: [String],
  altSpellings: [String, String, String],
  region: String,
  subregion: String,
  languages: {
    type: Map,
    of: String,
  },
  translations: {
    type: Map,
    of: { official: String, common: String },
  },
  latlng: [Number],
  landlocked: Boolean,
  borders: [String, String],
  area: Number,
  demonyms: {
    type: Map,
    of: { f: String, m: String },
  },
  flag: String,
  maps: {
    googleMaps: String, // URL check
    openStreetMaps: String,
  },
  population: Number,
  fifa: String,
  car: { signs: [String], side: String },
  timezones: [String],
  continents: [String],
  flags: {
    png: String,
    svg: String,
  },
  coatOfArms: {
    png: String,
    svg: String,
  },
  startOfWeek: String,
  capitalInfo: { latlng: [Number] },
  postalCode: { format: String, regex: String },
});

const Place = mongoose.model('Place', PlaceSchema);

export default Place;
