require('dotenv').config()
const mysql = require('mysql2')
const express = require('express')
const cors = require('cors')
const port = 3002

const app = express();
app.use(cors());

function agregarUser(mail,pass){
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    console.log('Connected!')
    q='INSERT INTO users (mail, pass) VALUES ("'+mail+'","'+pass+'");'
    connection.query(q)
    console.log('Disconnected.')
    connection.end()
}

function subirCosas(cosa,table,file){
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    console.log('Connected!')
    q='INSERT INTO '+ table +' ('+file+') VALUES ("'+cosa+'");'
    console.log(q)
    connection.query(q)
    console.log('Disconnected.')
    connection.end()
}


function validarUser(mail,pass){
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    console.log('Connected!')
    q='select * from users where mail = '+'"'+mail+'"'+';';
    connection.query(q, (err, result)=>{
            try{
                var p = result[0]['pass'];
                if (p==pass){
                    console.log(0)
                } else {
                    console.log(1)
                }
            } 
            catch(err){
                console.log(-1)
            }
        }
    ); 
    console.log('Disconnected.')
    connection.end()
}


function toList(l){
    let t = l.split(" ")
    let h = []
    for (var i in t) {h.push(parseInt(t[i]))}
    return h
}

function toString(l){
    let h = ""
    let i = 0
    let total = l.length
    while (i < total) {
        if (i!=(total-1)){
            h=h+l[i]+" "
        } else {
            h=h+l[i]
        }   
        i=i+1
    }
    return h
}

const abc = {
    'A': 78,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7,
    'I': 8,
    'J': 9,
    'K': 10,
    'L': 11,
    'M': 12,
    'N': 13,
    'Ñ': 14,
    'O': 15,
    'P': 16,
    'Q': 17,
    'R': 18,
    'S': 19,
    'T': 20,
    'U': 21,
    'V': 22,
    'W': 23,
    'X': 24,
    'Y': 25,
    'Z': 26,
    'a': 27,
    'b': 28,
    'c': 29,
    'd': 30,
    'e': 31,
    'f': 32,
    'g': 33,
    'h': 34,
    'i': 35,
    'j': 36,
    'k': 37,
    'l': 38,
    'm': 39,
    'n': 40,
    'ñ': 41,
    'o': 42,
    'p': 43,
    'q': 44,
    'r': 45,
    'd': 46,
    's': 47,
    't': 48,
    'u': 49,
    'v': 50,
    'w': 51,
    'x': 52,
    'y': 53,
    'z': 54,
    '' : 55,
    '.': 56,
    '@': 57,
    '"': 58,
    ':': 59,
    '/': 60,
    '-': 61,
    '_': 62,
    '1': 63,
    '2': 64,
    '3': 65,
    '4': 66,
    '5': 67,
    '6': 68,
    '7': 69,
    '8': 70,
    '9': 71,
    '0': 72,
    '{': 73,
    '}': 74,
    '=': 75,
    '¿': 76,
    '?': 77
}
const cba = {
    78: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "J",
    10: "K",
    11: "L",
    12: "M",
    13: "N",
    14: "Ñ",
    15: "0",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z",
    27: "a",
    28: "b",
    29: "c",
    30: "d",
    31: "e",
    32: "f",
    33: "g",
    34: "h",
    35: "i",
    36: "j",
    37: "k",
    38: "l",
    39: "m",
    40: "n",
    41: "ñ",
    42: "o",
    43: "p",
    44: "q",
    45: "r",
    46: "d",
    47: "s",
    48: "t",
    49: "u",
    50: "v",
    51: "w",
    52: "x",
    53: "y",
    54: "z",
    55: " ",
    56: ".",
    57: "@",
    58: '"',
    59: ':',
    60: '/',
    61: '-',
    62: '_',
    63: '1',
    64: '2',
    65: '3',
    66: '4',
    67: '5',
    68: '6',
    69: '7',
    70: '8',
    71: '9',
    72: '0',
    73: '{',
    74: '}',
    75: '=',
    76: '¿',
    77: '?'
}

function ciff_rsa(t,n1,n2,e){
    let text = t.split("")
    var c = []

    for (var i in text) {
        c.push(abc[text[i]]);
    }

    var c2 = []

    for (var j in c) {
        c2.push((c[j]**e)%(n1*n2));
    }
    return c2
}

function desciff_rsa(l,n1,n2,e){
    var l2=[]
    const z = expPri(n1,n2,e)
    for (var i in l) {
        l2.push(mod(l[i],z,(n1*n2)));
    }
    var l3=[];
    for (var k in l2) {
        l3.push(cba[l2[k]]);
    }
    return l3
}

function mod(num,exp,a){
    let u = BigInt(num)**BigInt(exp);
    let u2 = BigInt(u).toString();
    let res = 0;
    for(let i = 0; i < u2.length; i++)
        res = (res * 10 +
            parseInt(u2[i])) % a;
    return res;
}

function expPri(n1,n2,e){
    var d = [];
    var list = [...Array(10).keys()]
    const z = (n1-1)*(n2-1)
    for (var j in list) {
        if ((((j)*z)+1)%e==0){
            d.push(((j)*z)+1)
        }
    }
    
    return d[0]/e
}

module.exports={
    "ciff":ciff_rsa
}

const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected!')
q="SELECT * FROM users";
connection.query(q, (err, result)=>{
        try{
            console.log(result)
            app.get('/', (req, res) => {res.send(result)})
            app.listen(port, () => {console.log(`Example app listening on port ${port}`)})
        }catch(err){console.log(err)};
    }
); 
console.log('Disconnected.')

