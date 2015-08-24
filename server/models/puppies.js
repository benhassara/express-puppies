// has an ID that increments, name, and age

function Puppy(puppyID, puppyName, puppyAge) {
  this.puppyID = puppyID;
  this.puppyName = puppyName;
  this.puppyAge = puppyAge;
}

// data
var newPuppy = new Puppy(1, 'Gary', 4);
var bobPuppy = new Puppy(2, 'Bob', 3);
var philPuppy = new Puppy(3, 'Phil', 2);

var tempPuppyArr = [newPuppy, bobPuppy, philPuppy];

module.exports = {
  Puppy: Puppy,
  tempPuppyArr: tempPuppyArr
};
