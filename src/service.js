import React from 'react';
import { db } from './firebase'
import Axios from 'axios';
const qs = require('querystring')


export const post = (from, to, fine, law, comment) => {
    db.collection("Fines").doc().set({
      accepted: false,
      accused: to,
      accuser: from,
      afine: fine,
      alaw: law,
      acomment: comment,
      time: new Date()
    })
    .then(function() {
        postFineSlack(from, to, fine, law, comment)
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

export const getNames = () => {
    const names = []
    return db.collection("Sprint").doc('Sprintere').get()
    .then(doc => (
        Object.keys(doc.data()).forEach((key, value) => {
            names.push(key)
        }
    ))
    )
    .then(()=> names)
    .catch(function(error) {
        console.log("Error getting document:", error);
    });
}
export const getLaws = () => {
    const laws = []
    return db.collection("Sprint").doc('Lover').get()
    .then(doc => (
        Object.keys(doc.data()).forEach((key, value) => {
            laws.push(key)
        }
    ))
    )
    .then(()=> laws)
    .catch(function(error) {
        console.log("Error getting document:", error);
    });
}
export const getFines = () => {
    return db.collection("Fines").orderBy("time", "desc").get()
    .then(data => (
        (data.docs.map(doc=> {
            let d = doc.data();
            d.id = doc.id;
            return d;
        }
        ))
    ))
    .catch(function(error) {
        console.log("Error getting document:", error);
    });
}
export const updateFine = (doc, bool) => {
    return db.collection("Fines").doc(doc).get()
    .then(data => {
        if (!data.exists) {
            throw "Document does not exist!";
        }
        return db.collection("Fines").doc(doc).update( { accepted: bool })
        .then(data=> data);
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
    });
}
export const deleteFine = (doc) => {
    return db.collection("Fines").doc(doc).get()
    .then(data => {
        if (!data.exists) {
            throw "Document does not exist!";
        }
        return db.collection("Fines").doc(doc).delete()
        .then(data=> data);
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
    });
}


const postFineSlack = (from, to, fine, law, comment) => {
    Axios.post('https://slack.com/api/chat.postMessage',
    qs.stringify({
      token: process.env.REACT_APP_BOT_TOKEN,
      channel: "sprint-bøter",
      text: from + " anklager " + to + " for å ha brutt lov " + law + ", med forslag til bot på "+fine + " enheter. Kommentar: " + comment
    }),
    {
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
}