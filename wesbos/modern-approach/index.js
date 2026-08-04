const person = {
  name: "Alok",
  job: "Developer",
  city: "Bangalore",
};

const bodyEl = document.querySelector("body");

// Create container
const personDiv = document.createElement("div");
personDiv.classList.add("person");

// Create heading
const h2 = document.createElement("h2");
h2.textContent = `${person.name}`;

// Create a job span
const jobSpan = document.createElement("span");
jobSpan.classList.add("job");
jobSpan.textContent = `- ${person.job}`;

// Append span to h2
h2.appendChild(jobSpan);

// Create a paragraph
const paragraph = document.createElement("p");
paragraph.classList.add("location");
paragraph.textContent = `I am based in ${person.city}`;

// Assemble them all
personDiv.appendChild(h2);
personDiv.appendChild(paragraph);

// Render
bodyEl.appendChild(personDiv);

const dogs = [
  { name: "Snickers", age: 2 },
  { name: "Hugo", age: 6 },
  { name: "Prudence", age: 8 },
];

const ul = document.createElement("ul");

dogs.forEach((dog) => {
  const li = document.createElement("li");
  li.textContent = `${dog.name} is ${dog.age * 7} dog years old.`;
  ul.appendChild(li);
});

bodyEl.appendChild(ul);
