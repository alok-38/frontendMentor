// The Helper Function
function createElement(tag, options = {}) {
  const el = document.createElement(tag);

  const { className, text, html, attrs = {}, children = [] } = options;

  // Add class
  if (className) el.className = className;

  // Add text content
  if (text) el.textContent = text;

  // Add HTML (use carefully)
  if (html) el.innerHTML = html;

  // Add attributes
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });

  // Add children
  children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
}

const person = {
  name: "Alok",
  job: "Developer",
  city: "Bangalore",
};

const personDiv = createElement("div", {
  className: "person",
  children: [
    createElement("h2", {
      children: [
        `${person.name} - `,
        createElement("span", {
          className: "job",
          text: person.job,
        }),
      ],
    }),
    createElement("p", {
      className: "location",
      text: `I'm based in ${person.city}`,
    }),
  ],
});

const dogs = [
  { name: "Snickers", age: 2 },
  { name: "Hugo", age: 6 },
  { name: "Prudence", age: 8 },
];

const ul = createElement("ul", {
  children: dogs.map((dog) =>
    createElement("li", {
      text: `${dog.name} is ${dog.age * 7} dog years old.`,
    }),
  ),
});

document.body.appendChild(personDiv);
document.body.appendChild(ul);
