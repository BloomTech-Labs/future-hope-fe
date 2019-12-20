const countries = [
  { label: "Afghanistan" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia" },
  { label: "Bosnia and Herzegowina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" },
  { label: "Bulgaria" },
  { label: "Burkina Faso" },
  { label: "Burundi" },
  { label: "Cambodia" },
  { label: "Cameroon" },
  { label: "Canada" },
  { label: "Cape Verde" },
  { label: "Cayman Islands" },
  { label: "Central African Republic" },
  { label: "Chad" },
  { label: "Chile" },
  { label: "China" },
  { label: "Christmas Island" },
  { label: "Cocos (Keeling) Islands" },
  { label: "Colombia" },
  { label: "Comoros" },
  { label: "Congo" },
  { label: "Congo, the Democratic Republic of the" },
  { label: "Cook Islands" },
  { label: "Costa Rica" },
  { label: "Cote d'Ivoire" },
  { label: "Croatia (Hrvatska)" },
  { label: "Cuba" },
  { label: "Cyprus" },
  { label: "Czech Republic" },
  { label: "Denmark" },
  { label: "Djibouti" },
  { label: "Dominica" },
  { label: "Dominican Republic" },
  { label: "East Timor" },
  { label: "Ecuador" },
  { label: "Egypt" },
  { label: "El Salvador" },
  { label: "Equatorial Guinea" },
  { label: "Eritrea" },
  { label: "Estonia" },
  { label: "Ethiopia" },
  { label: "Falkland Islands (Malvinas)" },
  { label: "Faroe Islands" },
  { label: "Fiji" },
  { label: "Finland" },
  { label: "France" },
  { label: "France Metropolitan" },
  { label: "French Guiana" },
  { label: "French Polynesia" },
  { label: "French Southern Territories" },
  { label: "Gabon" },
  { label: "Gambia" },
  { label: "Georgia" },
  { label: "Germany" },
  { label: "Ghana" },
  { label: "Gibraltar" },
  { label: "Greece" },
  { label: "Greenland" },
  { label: "Grenada" },
  { label: "Guadeloupe" },
  { label: "Guam" },
  { label: "Guatemala" },
  { label: "Guinea" },
  { label: "Guinea-Bissau" },
  { label: "Guyana" },
  { label: "Haiti" },
  { label: "Heard and Mc Donald Islands" },
  { label: "Holy See (Vatican City State)" },
  { label: "Honduras" },
  { label: "Hong Kong" },
  { label: "Hungary" },
  { label: "Iceland" },
  { label: "India" },
  { label: "Indonesia" },
  { label: "Iran (Islamic Republic of)" },
  { label: "Iraq" },
  { label: "Ireland" },
  { label: "Israel" },
  { label: "Italy" },
  { label: "Jamaica" },
  { label: "Japan" },
  { label: "Jordan" },
  { label: "Kazakhstan" },
  { label: "Kenya" },
  { label: "Kiribati" },
  { label: "Korea, Democratic People's Republic of" },
  { label: "Korea, Republic of" },
  { label: "Kuwait" },
  { label: "Kyrgyzstan" },
  { label: "Lao, People's Democratic Republic" },
  { label: "Latvia" },
  { label: "Lebanon" },
  { label: "Lesotho" },
  { label: "Liberia" },
  { label: "Libyan Arab Jamahiriya" },
  { label: "Liechtenstein" },
  { label: "Lithuania" },
  { label: "Luxembourg" },
  { label: "Macau" },
  { label: "Macedonia, The Former Yugoslav Republic of" },
  { label: "Madagascar" },
  { label: "Malawi" },
  { label: "Malaysia" },
  { label: "Maldives" },
  { label: "Mali" },
  { label: "Malta" },
  { label: "Marshall Islands" },
  { label: "Martinique" },
  { label: "Mauritania" },
  { label: "Mauritius" },
  { label: "Mayotte" },
  { label: "Mexico" },
  { label: "Micronesia, Federated States of" },
  { label: "Moldova, Republic of" },
  { label: "Monaco" },
  { label: "Mongolia" },
  { label: "Montserrat" },
  { label: "Morocco" },
  { label: "Mozambique" },
  { label: "Myanmar" },
  { label: "Namibia" },
  { label: "Nauru" },
  { label: "Nepal" },
  { label: "Netherlands" },
  { label: "Netherlands Antilles" },
  { label: "New Caledonia" },
  { label: "New Zealand" },
  { label: "Nicaragua" },
  { label: "Niger" },
  { label: "Nigeria" },
  { label: "Niue" },
  { label: "Norfolk Island" },
  { label: "Northern Mariana Islands" },
  { label: "Norway" },
  { label: "Oman" },
  { label: "Pakistan" },
  { label: "Palau" },
  { label: "Panama" },
  { label: "Papua New Guinea" },
  { label: "Paraguay" },
  { label: "Peru" },
  { label: "Philippines" },
  { label: "Pitcairn" },
  { label: "Poland" },
  { label: "Portugal" },
  { label: "Puerto Rico" },
  { label: "Qatar" },
  { label: "Reunion" },
  { label: "Romania" },
  { label: "Russian Federation" },
  { label: "Rwanda" },
  { label: "Saint Kitts and Nevis" },
  { label: "Saint Lucia" },
  { label: "Saint Vincent and the Grenadines" },
  { label: "Samoa" },
  { label: "San Marino" },
  { label: "Sao Tome and Principe" },
  { label: "Saudi Arabia" },
  { label: "Senegal" },
  { label: "Seychelles" },
  { label: "Sierra Leone" },
  { label: "Singapore" },
  { label: "Slovakia (Slovak Republic)" },
  { label: "Slovenia" },
  { label: "Solomon Islands" },
  { label: "Somalia" },
  { label: "South Africa" },
  { label: "South Georgia and the South Sandwich Islands" },
  { label: "Spain" },
  { label: "Sri Lanka" },
  { label: "St. Helena" },
  { label: "St. Pierre and Miquelon" },
  { label: "Sudan" },
  { label: "Suriname" },
  { label: "Svalbard and Jan Mayen Islands" },
  { label: "Swaziland" },
  { label: "Sweden" },
  { label: "Switzerland" },
  { label: "Syrian Arab Republic" },
  { label: "Taiwan, Province of China" },
  { label: "Tajikistan" },
  { label: "Tanzania, United Republic of" },
  { label: "Thailand" },
  { label: "Togo" },
  { label: "Tokelau" },
  { label: "Tonga" },
  { label: "Trinidad and Tobago" },
  { label: "Tunisia" },
  { label: "Turkey" },
  { label: "Turkmenistan" },
  { label: "Turks and Caicos Islands" },
  { label: "Tuvalu" },
  { label: "Uganda" },
  { label: "Ukraine" },
  { label: "United Arab Emirates" },
  { label: "United Kingdom" },
  { label: "United States" },
  { label: "United States Minor Outlying Islands" },
  { label: "Uruguay" },
  { label: "Uzbekistan" },
  { label: "Vanuatu" },
  { label: "Venezuela" },
  { label: "Vietnam" },
  { label: "Virgin Islands (British)" },
  { label: "Virgin Islands (U.S.)" },
  { label: "Wallis and Futuna Islands" },
  { label: "Western Sahara" },
  { label: "Yemen" },
  { label: "Yugoslavia" },
  { label: "Zambia" },
  { label: "Zimbabwe" }
];

const states = [
  { label: "Alabama" },
  { label: "Alaska" },
  { label: "Arizona" },
  { label: "Arkansas" },
  { label: "California" },
  { label: "Colorado" },
  { label: "Connecticut" },
  { label: "Delaware" },
  { label: "Florida" },
  { label: "Georgia" },
  { label: "Hawaii" },
  { label: "Idaho" },
  { label: "Illnois" },
  { label: "Indiana" },
  { label: "Iowa" },
  { label: "Kansas" },
  { label: "Kentucky" },
  { label: "Louisiana" },
  { label: "Maine" },
  { label: "Maryland" },
  { label: "Massachusetts" },
  { label: "Michigan" },
  { label: "Minnesota" },
  { label: "Mississippi" },
  { label: "Missouri" },
  { label: "Montana" },
  { label: "Nebraska" },
  { label: "Nevada" },
  { label: "New Hampshire" },
  { label: "New Jersey" },
  { label: "New Mexico" },
  { label: "New York" },
  { label: "North Carolina" },
  { label: "North Dakota" },
  { label: "Ohio" },
  { label: "Oklahoma" },
  { label: "Oregon" },
  { label: "Pennsylvania" },
  { label: "Rhode Island" },
  { label: "South Carolina" },
  { label: "South Dakota" },
  { label: "Tennessee" },
  { label: "Texas" },
  { label: "Utah" },
  { label: "Vermont" },
  { label: "Virginia" },
  { label: "Washington" },
  { label: "West Virginia" },
  { label: "Wisconsin" },
  { label: "Wyoming" }
];

import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

const suggestions = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" }
];

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

renderInput.propTypes = {
  classes: PropTypes.object.isRequired,
  InputProps: PropTypes.object
};

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component='div'
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.number
  ]).isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired
};

function getSuggestions(value, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function DownshiftMultiple(props) {
  const { classes } = props;
  const [inputValue, setInputValue] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState([]);

  function handleKeyDown(event) {
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  return (
    <Downshift
      id='downshift-multiple'
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: "Select multiple countries"
        });

        return (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              label: "Countries",
              InputLabelProps: getLabelProps(),
              InputProps: {
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onBlur,
                onChange: event => {
                  handleInputChange(event);
                  onChange(event);
                },
                onFocus
              },
              inputProps
            })}

            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2
                  })
                )}
              </Paper>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing(2)
  }
}));

let popperNode;

export default function IntegrationDownshift() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Downshift id='downshift-simple'>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: "Search for a country (start with a)"
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: "Country",
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onFocus },
                inputProps
              })}

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
      <div className={classes.divider} />
      <DownshiftMultiple classes={classes} />
      <div className={classes.divider} />
      <Downshift id='downshift-popper'>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: "With Popper"
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: "Country",
                InputProps: { onBlur, onFocus },
                InputLabelProps: getLabelProps({ shrink: true }),
                inputProps,
                ref: node => {
                  popperNode = node;
                }
              })}

              <Popper open={isOpen} anchorEl={popperNode}>
                <div
                  {...(isOpen
                    ? getMenuProps({}, { suppressRefError: true })
                    : {})}
                >
                  <Paper
                    square
                    style={{
                      marginTop: 8,
                      width: popperNode ? popperNode.clientWidth : undefined
                    }}
                  >
                    {getSuggestions(inputValue).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem
                      })
                    )}
                  </Paper>
                </div>
              </Popper>
            </div>
          );
        }}
      </Downshift>
      <div className={classes.divider} />
      <Downshift id='downshift-options'>
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          openMenu,
          selectedItem
        }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onChange: event => {
              if (event.target.value === "") {
                clearSelection();
              }
            },
            onFocus: openMenu,
            placeholder: "With the clear & show empty options"
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: "Countries",
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onChange, onFocus },
                inputProps
              })}

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue, { showEmpty: true }).map(
                      (suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.label }),
                          highlightedIndex,
                          selectedItem
                        })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}
