"use strict";

let votePrice = '10';

function init()
{
    let candidates = ["Tom","Mike","Jerry"];
    storageStore('issuer', sender);
    storageStore('candidates', JSON.stringify(candidates));
    storageStore('candidateVotes', JSON.stringify({"Tom": 0, "Mike": 0, "Jerry": 0}));
    storageStore('votes', JSON.stringify({}));
    return;
}

function main(input)
{
    let para = JSON.parse(input);
    let numbers = para.numbers;
    let candidates = JSON.parse(storageLoad('candidates'));
    let candidateVotes = JSON.parse(storageLoad('candidateVotes'));
    let to = para.candidate;
    let votes = JSON.parse(storageLoad('votes'));
    if (para.method === 'vote' ) {
        assert(thisPayCoinAmount === votePrice, "price is " + votePrice + ", you send " + thisPayCoinAmount);
        let candIdx = candidates.indexOf(to);
        assert(candIdx !== -1, "Candidate param is wrong.");
        // assert(!(sender in votes), "You already vote");
        votes[sender] = candIdx;
        candidateVotes[to] = candidateVotes[to] + 1;
        storageStore('votes', JSON.stringify(votes));
        storageStore('candidateVotes', JSON.stringify(candidateVotes));
    }
    else if (para.method === 'done'){
        tlog('thisAddress: ', thisAddress);
        let issuer = storageLoad('issuer');
        assert(sender === issuer, "only owner can call");
        let index = 0;
        let voter;
        Object.keys(votes).forEach(function(voter) {
            payCoin(voter, votePrice, 'Payout ' + voter + 'with vote price: ' + votePrice);
            tlog('vote price payout', 'Payout ' + voter + 'with vote price: ' + votePrice);
        });
        storageStore('votes', JSON.stringify({}));
    }
}

function query()
{ 
    let result = {};
    result.candidates = JSON.parse(storageLoad('candidates'));
    result.candidateVotes = JSON.parse(storageLoad('candidateVotes'));
    result.votes = JSON.parse(storageLoad('votes'));
    result.issuer = storageLoad('issuer');
    return JSON.stringify(result);
}