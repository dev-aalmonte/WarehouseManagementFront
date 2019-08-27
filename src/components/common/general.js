export function getStateList(options = 0){
    const states = [
        {key: "AL", value: "Alabama"},
        {key: "AK", value: "Alaska"},
        // {key: "American Samoa", value: "american-samoa"},
        {key: "AZ", value: "Arizona"},
        {key: "AR", value: "Arkansas"},
        {key: "CA", value: "California"},
        {key: "CO", value: "Colorado"},
        {key: "CT", value: "Connecticut"},
        {key: "DE", value: "Delaware"},
        {key: "DC", value: "District Of Columbia"},
        // {key: "Federated States Of Micronesia", value: "federated-states-of-micronesia"},
        {key: "FL", value: "Florida"},
        {key: "GA", value: "Georgia"},
        // {key: "Guam", value: "guam"},
        {key: "HI", value: "Hawaii"},
        {key: "ID", value: "Idaho"},
        {key: "IL", value: "Illinois"},
        {key: "IN", value: "Indiana"},
        {key: "IA", value: "Iowa"},
        {key: "KS", value: "Kansas"},
        {key: "KY", value: "Kentucky"},
        {key: "LA", value: "Louisiana"},
        {key: "ME", value: "Maine"},
        // {key: "Marshall Islands", value: "marshall-islands"},
        {key: "MD", value: "Maryland"},
        {key: "MA", value: "Massachusetts"},
        {key: "MI", value: "Michigan"},
        {key: "MN", value: "Minnesota"},
        {key: "MS", value: "Mississippi"},
        {key: "MO", value: "Missouri"},
        {key: "MT", value: "Montana"},
        {key: "NE", value: "Nebraska"},
        {key: "NV", value: "Nevada"},
        {key: "NH", value: "New Hampshire"},
        {key: "NJ", value: "New Jersey"},
        {key: "NM", value: "New Mexico"},
        {key: "NY", value: "New York"},
        {key: "NC", value: "North Carolina"},
        {key: "ND", value: "North Dakota"},
        // {key: "Northern Mariana Islands", value: "northern-mariana-islands"},
        {key: "OH", value: "Ohio"},
        {key: "OK", value: "Oklahoma"},
        {key: "OR", value: "Oregon"},
        // {key: "Palau", value: "palau"},
        {key: "PA", value: "Pennsylvania"},
        // {key: "Puerto Rico", value: "puerto-rico"},
        {key: "RI", value: "Rhode Island"},
        {key: "SC", value: "South Carolina"},
        {key: "SD", value: "South Dakota"},
        {key: "TN", value: "Tennessee"},
        {key: "TX", value: "Texas"},
        {key: "UT", value: "Utah"},
        {key: "VT", value: "Vermont"},
        // {key: "Virgin Islands", value: "virgin-islands"},
        {key: "VA", value: "Virginia"},
        {key: "WA", value: "Washington"},
        {key: "WV", value: "West Virginia"},
        {key: "WI", value: "Wisconsin"},
        {key: "WY", value: "Wyoming"}
    ];

    let ret = [];

    switch(options) {
        case 1:
            // Key: Full value, Value: Full value
            states.map(state => {
                ret.push({
                    key: state.value,
                    value: state.value
                })
            })
            return ret;
        
        case 2: 
            // Key: Key value, Value: Full value (Key value)
            states.map(state => {
                ret.push({
                    key: state.key,
                    value: `${state.value} (${state.key})`
                });
            })
            return ret;

        case 3: 
            // Key: Key value, Value: Key value
            states.map(state => {
                ret.push({
                    key: state.key,
                    value: state.key
                });
            })
            return ret;

        default:
            return states;
    }
}

export function getCountryList() {
    const countries = [ 
        {key: 'AF', value: 'Afghanistan'}, 
        {key: 'AX', value: 'Åland Islands'}, 
        {key: 'AL', value: 'Albania'}, 
        {key: 'DZ', value: 'Algeria'}, 
        {key: 'AS', value: 'American Samoa'}, 
        {key: 'AD', value: 'AndorrA'}, 
        {key: 'AO', value: 'Angola'}, 
        {key: 'AI', value: 'Anguilla'}, 
        {key: 'AQ', value: 'Antarctica'}, 
        {key: 'AG', value: 'Antigua and Barbuda'}, 
        {key: 'AR', value: 'Argentina'}, 
        {key: 'AM', value: 'Armenia'}, 
        {key: 'AW', value: 'Aruba'}, 
        {key: 'AU', value: 'Australia'}, 
        {key: 'AT', value: 'Austria'}, 
        {key: 'AZ', value: 'Azerbaijan'}, 
        {key: 'BS', value: 'Bahamas'}, 
        {key: 'BH', value: 'Bahrain'}, 
        {key: 'BD', value: 'Bangladesh'}, 
        {key: 'BB', value: 'Barbados'}, 
        {key: 'BY', value: 'Belarus'}, 
        {key: 'BE', value: 'Belgium'}, 
        {key: 'BZ', value: 'Belize'}, 
        {key: 'BJ', value: 'Benin'}, 
        {key: 'BM', value: 'Bermuda'}, 
        {key: 'BT', value: 'Bhutan'}, 
        {key: 'BO', value: 'Bolivia'}, 
        {key: 'BA', value: 'Bosnia and Herzegovina'}, 
        {key: 'BW', value: 'Botswana'}, 
        {key: 'BV', value: 'Bouvet Island'}, 
        {key: 'BR', value: 'Brazil'}, 
        {key: 'IO', value: 'British Indian Ocean Territory'}, 
        {key: 'BN', value: 'Brunei Darussalam'}, 
        {key: 'BG', value: 'Bulgaria'}, 
        {key: 'BF', value: 'Burkina Faso'}, 
        {key: 'BI', value: 'Burundi'}, 
        {key: 'KH', value: 'Cambodia'}, 
        {key: 'CM', value: 'Cameroon'}, 
        {key: 'CA', value: 'Canada'}, 
        {key: 'CV', value: 'Cape Verde'}, 
        {key: 'KY', value: 'Cayman Islands'}, 
        {key: 'CF', value: 'Central African Republic'}, 
        {key: 'TD', value: 'Chad'}, 
        {key: 'CL', value: 'Chile'}, 
        {key: 'CN', value: 'China'}, 
        {key: 'CX', value: 'Christmas Island'}, 
        {key: 'CC', value: 'Cocos (Keeling) Islands'}, 
        {key: 'CO', value: 'Colombia'}, 
        {key: 'KM', value: 'Comoros'}, 
        {key: 'CG', value: 'Congo'}, 
        {key: 'CD', value: 'The Democratic Republic of the Congo'}, 
        {key: 'CK', value: 'Cook Islands'}, 
        {key: 'CR', value: 'Costa Rica'}, 
        {key: 'CI', value: 'Cote D\'Ivoire'}, 
        {key: 'HR', value: 'Croatia'}, 
        {key: 'CU', value: 'Cuba'}, 
        {key: 'CY', value: 'Cyprus'}, 
        {key: 'CZ', value: 'Czech Republic'}, 
        {key: 'DK', value: 'Denmark'}, 
        {key: 'DJ', value: 'Djibouti'}, 
        {key: 'DM', value: 'Dominica'}, 
        {key: 'DO', value: 'Dominican Republic'}, 
        {key: 'EC', value: 'Ecuador'}, 
        {key: 'EG', value: 'Egypt'}, 
        {key: 'SV', value: 'El Salvador'}, 
        {key: 'GQ', value: 'Equatorial Guinea'}, 
        {key: 'ER', value: 'Eritrea'}, 
        {key: 'EE', value: 'Estonia'}, 
        {key: 'ET', value: 'Ethiopia'}, 
        {key: 'FK', value: 'Falkland Islands (Malvinas)'}, 
        {key: 'FO', value: 'Faroe Islands'}, 
        {key: 'FJ', value: 'Fiji'}, 
        {key: 'FI', value: 'Finland'}, 
        {key: 'FR', value: 'France'}, 
        {key: 'GF', value: 'French Guiana'}, 
        {key: 'PF', value: 'French Polynesia'}, 
        {key: 'TF', value: 'French Southern Territories'}, 
        {key: 'GA', value: 'Gabon'}, 
        {key: 'GM', value: 'Gambia'}, 
        {key: 'GE', value: 'Georgia'}, 
        {key: 'DE', value: 'Germany'}, 
        {key: 'GH', value: 'Ghana'}, 
        {key: 'GI', value: 'Gibraltar'}, 
        {key: 'GR', value: 'Greece'}, 
        {key: 'GL', value: 'Greenland'}, 
        {key: 'GD', value: 'Grenada'}, 
        {key: 'GP', value: 'Guadeloupe'}, 
        {key: 'GU', value: 'Guam'}, 
        {key: 'GT', value: 'Guatemala'}, 
        {key: 'GG', value: 'Guernsey'}, 
        {key: 'GN', value: 'Guinea'}, 
        {key: 'GW', value: 'Guinea-Bissau'}, 
        {key: 'GY', value: 'Guyana'}, 
        {key: 'HT', value: 'Haiti'}, 
        {key: 'HM', value: 'Heard Island and Mcdonald Islands'}, 
        {key: 'VA', value: 'Holy See (Vatican City State)'}, 
        {key: 'HN', value: 'Honduras'}, 
        {key: 'HK', value: 'Hong Kong'}, 
        {key: 'HU', value: 'Hungary'}, 
        {key: 'IS', value: 'Iceland'}, 
        {key: 'IN', value: 'India'}, 
        {key: 'ID', value: 'Indonesia'}, 
        {key: 'IR', value: 'Islamic Republic Of Iran'}, 
        {key: 'IQ', value: 'Iraq'}, 
        {key: 'IE', value: 'Ireland'}, 
        {key: 'IM', value: 'Isle of Man'}, 
        {key: 'IL', value: 'Israel'}, 
        {key: 'IT', value: 'Italy'}, 
        {key: 'JM', value: 'Jamaica'}, 
        {key: 'JP', value: 'Japan'}, 
        {key: 'JE', value: 'Jersey'}, 
        {key: 'JO', value: 'Jordan'}, 
        {key: 'KZ', value: 'Kazakhstan'}, 
        {key: 'KE', value: 'Kenya'}, 
        {key: 'KI', value: 'Kiribati'}, 
        {key: 'KP', value: 'Democratic People\'S Republic of Korea='},
        {key: 'KR', value: 'Republic of Korea'}, 
        {key: 'KW', value: 'Kuwait'}, 
        {key: 'KG', value: 'Kyrgyzstan'}, 
        {key: 'LA', value: 'Lao People\'S Democratic Republic'}, 
        {key: 'LV', value: 'Latvia'}, 
        {key: 'LB', value: 'Lebanon'}, 
        {key: 'LS', value: 'Lesotho'}, 
        {key: 'LR', value: 'Liberia'}, 
        {key: 'LY', value: 'Libyan Arab Jamahiriya'}, 
        {key: 'LI', value: 'Liechtenstein'}, 
        {key: 'LT', value: 'Lithuania'}, 
        {key: 'LU', value: 'Luxembourg'}, 
        {key: 'MO', value: 'Macao'}, 
        {key: 'MK', value: 'The Former Yugoslav Republic of Macedonia'}, 
        {key: 'MG', value: 'Madagascar'}, 
        {key: 'MW', value: 'Malawi'}, 
        {key: 'MY', value: 'Malaysia'}, 
        {key: 'MV', value: 'Maldives'}, 
        {key: 'ML', value: 'Mali'}, 
        {key: 'MT', value: 'Malta'}, 
        {key: 'MH', value: 'Marshall Islands'}, 
        {key: 'MQ', value: 'Martinique'}, 
        {key: 'MR', value: 'Mauritania'}, 
        {key: 'MU', value: 'Mauritius'}, 
        {key: 'YT', value: 'Mayotte'}, 
        {key: 'MX', value: 'Mexico'}, 
        {key: 'FM', value: 'Federated States of Micronesia'}, 
        {key: 'MD', value: 'Republic of Moldova'}, 
        {key: 'MC', value: 'Monaco'}, 
        {key: 'MN', value: 'Mongolia'}, 
        {key: 'MS', value: 'Montserrat'}, 
        {key: 'MA', value: 'Morocco'}, 
        {key: 'MZ', value: 'Mozambique'}, 
        {key: 'MM', value: 'Myanmar'}, 
        {key: 'NA', value: 'Namibia'}, 
        {key: 'NR', value: 'Nauru'}, 
        {key: 'NP', value: 'Nepal'}, 
        {key: 'NL', value: 'Netherlands'}, 
        {key: 'AN', value: 'Netherlands Antilles'}, 
        {key: 'NC', value: 'New Caledonia'}, 
        {key: 'NZ', value: 'New Zealand'}, 
        {key: 'NI', value: 'Nicaragua'}, 
        {key: 'NE', value: 'Niger'}, 
        {key: 'NG', value: 'Nigeria'}, 
        {key: 'NU', value: 'Niue'}, 
        {key: 'NF', value: 'Norfolk Island'}, 
        {key: 'MP', value: 'Northern Mariana Islands'}, 
        {key: 'NO', value: 'Norway'}, 
        {key: 'OM', value: 'Oman'}, 
        {key: 'PK', value: 'Pakistan'}, 
        {key: 'PW', value: 'Palau'}, 
        {key: 'PS', value: 'Palestinian Territory, Occupied'}, 
        {key: 'PA', value: 'Panama'}, 
        {key: 'PG', value: 'Papua New Guinea'}, 
        {key: 'PY', value: 'Paraguay'}, 
        {key: 'PE', value: 'Peru'}, 
        {key: 'PH', value: 'Philippines'}, 
        {key: 'PN', value: 'Pitcairn'}, 
        {key: 'PL', value: 'Poland'}, 
        {key: 'PT', value: 'Portugal'}, 
        {key: 'PR', value: 'Puerto Rico'}, 
        {key: 'QA', value: 'Qatar'}, 
        {key: 'RE', value: 'Reunion'}, 
        {key: 'RO', value: 'Romania'}, 
        {key: 'RU', value: 'Russian Federation'}, 
        {key: 'RW', value: 'RWANDA'}, 
        {key: 'SH', value: 'Saint Helena'}, 
        {key: 'KN', value: 'Saint Kitts and Nevis'}, 
        {key: 'LC', value: 'Saint Lucia'}, 
        {key: 'PM', value: 'Saint Pierre and Miquelon'}, 
        {key: 'VC', value: 'Saint Vincent and the Grenadines'}, 
        {key: 'WS', value: 'Samoa'}, 
        {key: 'SM', value: 'San Marino'}, 
        {key: 'ST', value: 'Sao Tome and Principe'}, 
        {key: 'SA', value: 'Saudi Arabia'}, 
        {key: 'SN', value: 'Senegal'}, 
        {key: 'CS', value: 'Serbia and Montenegro'}, 
        {key: 'SC', value: 'Seychelles'}, 
        {key: 'SL', value: 'Sierra Leone'}, 
        {key: 'SG', value: 'Singapore'}, 
        {key: 'SK', value: 'Slovakia'}, 
        {key: 'SI', value: 'Slovenia'}, 
        {key: 'SB', value: 'Solomon Islands'}, 
        {key: 'SO', value: 'Somalia'}, 
        {key: 'ZA', value: 'South Africa'}, 
        {key: 'GS', value: 'South Georgia and the South Sandwich Islands'}, 
        {key: 'ES', value: 'Spain'}, 
        {key: 'LK', value: 'Sri Lanka'}, 
        {key: 'SD', value: 'Sudan'}, 
        {key: 'SR', value: 'Suriname'}, 
        {key: 'SJ', value: 'Svalbard and Jan Mayen'}, 
        {key: 'SZ', value: 'Swaziland'}, 
        {key: 'SE', value: 'Sweden'}, 
        {key: 'CH', value: 'Switzerland'}, 
        {key: 'SY', value: 'Syrian Arab Republic'}, 
        {key: 'TW', value: 'Taiwan, Province of China'}, 
        {key: 'TJ', value: 'Tajikistan'}, 
        {key: 'TZ', value: 'United Republic of Tanzania'}, 
        {key: 'TH', value: 'Thailand'}, 
        {key: 'TL', value: 'Timor-Leste'}, 
        {key: 'TG', value: 'Togo'}, 
        {key: 'TK', value: 'Tokelau'}, 
        {key: 'TO', value: 'Tonga'}, 
        {key: 'TT', value: 'Trinidad and Tobago'}, 
        {key: 'TN', value: 'Tunisia'}, 
        {key: 'TR', value: 'Turkey'}, 
        {key: 'TM', value: 'Turkmenistan'}, 
        {key: 'TC', value: 'Turks and Caicos Islands'}, 
        {key: 'TV', value: 'Tuvalu'}, 
        {key: 'UG', value: 'Uganda'}, 
        {key: 'UA', value: 'Ukraine'}, 
        {key: 'AE', value: 'United Arab Emirates'}, 
        {key: 'GB', value: 'United Kingdom'}, 
        {key: 'US', value: 'United States'}, 
        {key: 'UM', value: 'United States Minor Outlying Islands'}, 
        {key: 'UY', value: 'Uruguay'}, 
        {key: 'UZ', value: 'Uzbekistan'}, 
        {key: 'VU', value: 'Vanuatu'}, 
        {key: 'VE', value: 'Venezuela'}, 
        {key: 'VN', value: 'Viet Nam'}, 
        {key: 'VG', value: 'Virgin Islands, British'}, 
        {key: 'VI', value: 'Virgin Islands, U.S.'}, 
        {key: 'WF', value: 'Wallis and Futuna'}, 
        {key: 'EH', value: 'Western Sahara'}, 
        {key: 'YE', value: 'Yemen'}, 
        {key: 'ZM', value: 'Zambia'}, 
        {key: 'ZW', value: 'Zimbabwe'} 
    ];

    let ret = [];

    switch(options) {
        case 1:
            // Key: Full value, Value: Full value
            countries.map(country => {
                ret.push({
                    key: country.value,
                    value: country.value
                })
            })
            return ret;
        
        case 2: 
            // Key: Key value, Value: Full value (Key value)
            countries.map(country => {
                ret.push({
                    key: country.key,
                    value: `${country.value} (${country.key})`
                });
            })
            return ret;

        case 3: 
            // Key: Key value, Value: Key value
            countries.map(country => {
                ret.push({
                    key: country.key,
                    value: country.key
                });
            })
            return ret;

        default:
            return countries;
    }
}