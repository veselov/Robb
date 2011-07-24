// Load ‘Robb.js’
var Robb = require('../src/robb.js');

/**
 * Test ‘isPercentage’
 *
 * @param {object} test
 */
exports.isPercentage = function(test) {

  var percentage = [
    96,
    78,
    55,
    3,
    67,
    49,
    70,
    7,
    8.92,
    12.12,
    31,
    73,
    10,
    77,
    99,
    82,
    98,
    69,
    53,
    66,
    51,
    85,
    8,
    58,
    71,
    5,
    79,
    57,
    61,
    27,
    13,
    20,
    48,
    43,
    39,
    23,
    93,
    87,
    74,
    29,
    22,
    64,
    65,
    91,
    21,
    12,
    76,
    14,
    17,
    24,
    45,
    84,
    88,
    1,
    50,
    56,
    52,
    97,
    81,
    72,
    11,
    94,
    36,
    89,
    42,
    41,
    4,
    46,
    40,
    35,
    33,
    0,
    100,
    15,
    6,
    59,
    60,
    92,
    80,
    83,
    19,
    47,
    26,
    62,
    95,
    9,
    68,
    30,
    38,
    34,
    90,
    28,
    37,
    44,
    54,
    86,
    75,
    16,
    18,
    63,
    32,
    2,
    25
  ];

  percentage.forEach(function(num) {
    var result = Robb.isPercentage( num );
    test.strictEqual( result, true );
  });

  var fails = [
    145,
    109,
    156,
    153,
    132,
    134,
    159,
    151,
    108,
    200,
    136,
    143,
    154,
    128,
    120,
    172,
    171,
    185,
    117,
    111,
    114,
    121,
    131,
    199,
    192,
    190,
    149,
    170,
    139,
    133,
    193,
    157,
    103,
    110,
    124,
    167,
    130,
    196,
    162,
    150,
    115,
    197,
    165,
    200,
    198,
    174,
    169,
    178,
    180,
    175,
    135,
    188,
    102,
    168,
    164,
    123,
    191,
    122,
    113,
    161,
    179,
    137,
    105,
    104,
    186,
    182,
    163,
    107,
    144,
    176,
    101,
    160,
    195,
    125,
    152,
    138,
    158,
    155,
    166,
    147,
    173,
    142,
    127,
    112,
    183,
    146,
    148,
    118,
    116,
    181,
    187,
    140,
    194,
    106,
    129,
    189,
    126,
    119,
    184,
    177
  ];

  fails.forEach(function(num) {
    var result = Robb.isPercentage( num );
    test.strictEqual( result, false );
  });

  test.done();

};