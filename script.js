document.addEventListener("DOMContentLoaded", () => {
  const carContainer = document.getElementById("carContainer");
  const filterButton = document.getElementById("filterButton");

  // Function to render car cards dynamically
  function renderCars(cars) {
    carContainer.innerHTML = ""; // Clear existing content
    if (cars.length === 0) {
      carContainer.innerHTML = "<p>No cars match your criteria. Try again!</p>";
      return;
    }

    cars.forEach((car) => {
      const carCard = document.createElement("div");
      carCard.classList.add("card"); // Ensure this matches your CSS class

      carCard.innerHTML = `
        <img src="assets/img/${car.image}" alt="${car.make} ${
        car.model
      }" class="car-image"> 
        <h3>${car.make} ${car.model} (${car.year})</h3>
        <p class="price">$${car.price.toLocaleString()}</p>
        <p>Mileage: ${car.mileage.toLocaleString()} miles</p>
        <p>Color: ${car.color}</p>
        <p>Gas Mileage: ${car.gasMileage}</p>
        <button>View Details</button>
      `;

      carContainer.appendChild(carCard);
    });
  }

  // Function to filter cars based on user input
  function filterCars() {
    const minYear = parseInt(document.getElementById("minYear").value) || 0;
    const maxYear = parseInt(document.getElementById("maxYear").value) || 9999;
    const makes = Array.from(
      document.getElementById("makes").selectedOptions
    ).map((opt) => opt.value);
    const maxMileage =
      parseInt(document.getElementById("maxMileage").value) || Infinity;
    const minPrice = parseInt(document.getElementById("minPrice").value) || 0;
    const maxPrice =
      parseInt(document.getElementById("maxPrice").value) || Infinity;
    const colors = Array.from(
      document.getElementById("colors").selectedOptions
    ).map((opt) => opt.value);

    // Apply filters to the dataset
    const filteredCars = usedCars.filter(
      (car) =>
        car.year >= minYear &&
        car.year <= maxYear &&
        (makes.length === 0 || makes.includes(car.make)) &&
        car.mileage <= maxMileage &&
        car.price >= minPrice &&
        car.price <= maxPrice &&
        (colors.length === 0 || colors.includes(car.color))
    );

    renderCars(filteredCars); // Render the filtered cars
  }

  // Initial render of all cars
  renderCars(usedCars);

  // Attach filter functionality to the button
  filterButton.addEventListener("click", filterCars);
});
