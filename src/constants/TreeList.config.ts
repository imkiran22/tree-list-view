import { ITreeList } from "../components/TreeList";

export const TreeListConfig: ITreeList = [
  {
    name: "Participant",
    key: "participant",
    id: "1",
    checked: false,
    fields: [
      {
        name: "Name",
        key: "name",
        checked: false
      },
      {
        name: "Language",
        key: "language",
        checked: false,
        fields: [
          {
            name: "Tamil",
            key: "tamil",
            checked: false
          },
          {
            name: "Malalayalam",
            key: "malayalam",
            checked: false
          },
          {
            name: "Hindi",
            key: "hindi",
            checked: false
          },
          {
            name: "Telugu",
            key: "telugu",
            checked: false
          },
          {
            name: "Kannada",
            key: "kannada",
            checked: false
          }
        ]
      },
      {
        name: "Country",
        key: "country",
        checked: false,
        fields: [
          {
            name: "India",
            key: "india",
            checked: false
          },
          {
            name: "USA",
            key: "usa",
            checked: false
          },
          {
            name: "Russia",
            key: "russia",
            checked: false
          },
          {
            name: "Australia",
            key: "australia",
            checked: false
          },
          {
            name: "China",
            key: "china",
            checked: false
          }
        ]
      }
    ]
  },
  {
    name: "Game of choice",
    key: "game_of_choice",
    id: "2",
    checked: false,
    fields: [
      {
        name: "Game Name",
        key: "game_name",
        checked: false
      },
      {
        name: "Bought",
        key: "bought",
        checked: false,
        fields: [
          {
            name: "Prince of persia",
            key: "prince_of_persia",
            checked: false
          },
          {
            name: "GTA",
            key: "gta",
            checked: false
          },
          {
            name: "Road Rash",
            key: "road_rash",
            checked: false,
            fields: [
              {
                name: "Legacy",
                key: "legacy",
                checked: false
              },
              {
                name: "New Edition",
                key: "new_edition",
                checked: false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Performance",
    key: "performance",
    id: "3",
    checked: false,
    fields: [
      {
        name: "Bank Balance",
        key: "bank_balance",
        checked: false,
        fields: [
          {
            name: "Loan EMI",
            key: "loan_emi",
            checked: false
          },
          {
            name: "RD Balance",
            key: "rd_balance",
            checked: false
          },
          {
            name: "Savings",
            key: "savings",
            checked: false
          },
          {
            name: "Current",
            key: "current",
            checked: false
          }
        ]
      },
      {
        name: "Extra Info 1",
        key: "extra_info_1",
        checked: false
      }
    ]
  }
];
