const {performance } = require('perf_hooks');
const uuidv4 = require('uuid/v4');


/**
 * MeasureTime Array and Others
 * Add, Iterate, Delete
 */



const testCount = 3000000;
const makeID = uuidv4;

const makeData = (time, id) => {
    return {
        time: time,
        id: id
    }
};

const makeArray = n => {
    const arr = [];

    console.time("Time of making array");
    for (let i=0; i<n; i++) {
        arr.push(makeData(performance.now(), makeID()));
    }
    console.timeEnd("Time of making array");

    return arr;
};

const loopArray = arr => {
    console.time("Time of loop array");
    let loopCount = 0;
    arr.forEach(data => {
        if(data.time > 0) loopCount++
    });
    console.timeEnd("Time of loop array");
    // console.log("Array count=>"+loopCount);
};


const makeSet = n => {
    const set = new Set();

    console.time("Time of making set");
    for (let i=0; i<n; i++) {
        set.add(makeData(performance.now(), makeID()));
    }
    console.timeEnd("Time of making set");

    return set;
};

const loopSet = set => {
    console.time("Time of loop set");
    let loopCount = 0;
    set.forEach(data => {
        if(data.time > 0) loopCount++
    });
    console.timeEnd("Time of loop set");
    // console.log("Set count=>"+loopCount);
};

const makeLinkedList = n => {
    let head, tail;

    console.time("Time of making LinkedList");
    for (let i=0; i<n; i++) {
        const data = makeData(performance.now(), makeID());

        if(!head) head = data;
        if(tail) tail.next = data;

        tail = data;
    }
    console.timeEnd("Time of making LinkedList");


    return {
        head: head,
        tail: tail
    };
};

const loopLinkedList = linkedList => {
    let data = linkedList.head;

    let loopCount = 1;
    console.time("Time of loop LinkedList");
    while(data.next) {
        if(data.time > 0) loopCount++
        data = data.next;
    }
    console.timeEnd("Time of loop LinkedList");
    // console.log("LinkedList count=>"+loopCount);
};


const arr = makeArray(testCount);
const set = makeSet(testCount);
const linkedList = makeLinkedList(testCount);


loopArray(arr);
loopSet(set);
loopLinkedList(linkedList);

