import { Cfield } from './cfield';

export class Offer {
  _id?: string;
  name: string;
  url: string;
  img_url: string;
  description: string;
  checks: {
  	check_gender1: {
  		use: boolean;
  		cond: string;
  	},
  	check_gender2: {
  		use: boolean;
  		cond: string;
  	},
  	check_age: {
  		use: boolean;
      low: number;
      high: number;
  	},
    check_postcode: {
      use: boolean;
      postcodes: string;
    },
    check_state: {
      use: boolean;
      states: string;
    }
  };
  preqst: {
    type: string;
    key: string;
    description: string;
    selectedValue: string;
    values: [
      {
        value: string;
        label: string;
        primary: boolean;
        selected: any;
      }
    ]
  };
  presets: Array<
    {
      source: string;
      target: string;
    }
  >;
  cfields: Array<{cfield_id: string;use: boolean;}>;
  new_cfields: Array<Cfield>;
  passed: boolean;
  enabled: boolean;
}