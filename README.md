Here’s a README template for your project, including instructions and descriptions based on the Sequelize models provided:

---

# Weekly Performance Report

This project provides an implementation of Sequelize models to manage data related to weekly performance reports. It includes models for finance data, business development unit (BDU) data, and project data.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Sequelize Models](#sequelize-models)
  - [Finance Data Model](#finance-data-model)
  - [BDU Data Model](#bdu-data-model)
  - [Project Data Model](#project-data-model)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project defines Sequelize models to store and manage weekly performance data, including financial metrics, project completion rates, and team performance indicators. The data is based on an Excel sheet that has been parsed and converted into structured models.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/weekly-performance-report.git
   cd weekly-performance-report
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**

   Create a `.env` file in the root of the project and add your database credentials:
   ```
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_NAME=your-database-name
   DB_USER=your-database-username
   DB_PASS=your-database-password
   ```

## Database Setup

1. **Create the database:**
   Use your database client or a command line tool to create a new database.

2. **Run migrations (if any):**
   ```bash
   npx sequelize-cli db:migrate
   ```

## Sequelize Models

### Finance Data Model

Represents the financial metrics related to weekly performance.

- **Fields:**
  - `week`: String (nullable)
  - `team`: String (not nullable)
  - `plannedCashCollection`: Float (nullable)
  - `actualCashCollection`: Float (nullable)
  - `plannedPayrollToRevenueRatio`: Float (nullable)
  - `actualPayrollToRevenueRatio`: Float (nullable)
  - `countryOffice`: String (nullable)
  - `totalActualCashCollection`: Float (nullable)
  - `totalPlannedCashCollection`: Float (nullable)
  - `percentage`: Float (nullable)

### BDU Data Model

Captures data related to business development, including planned and actual submissions.

- **Fields:**
  - `week`: String (nullable)
  - `team`: String (not nullable)
  - `plannedTpSubmission`: Integer (nullable)
  - `actualTpSubmission`: Integer (nullable)
  - `plannedBasedOnCountryOffices`: Integer (nullable)
  - `actualTpBasedOnCountryOffices`: Integer (nullable)
  - `contractAward`: String (nullable)
  - `technicalResult`: String (nullable)
  - `totalResult`: String (nullable)
  - `awardAnnouncementDate`: Date (nullable)
  - `projectWinner`: String (nullable)

### Project Data Model

Tracks project service production, including planned vs. actual figures.

- **Fields:**
  - `week`: String (nullable)
  - `team`: String (not nullable)
  - `plannedServiceProduction`: Float (nullable)
  - `actualServiceProduction`: Float (nullable)
  - `countryOffice`: String (nullable)
  - `totalServiceProductionPlanned`: Float (nullable)
  - `totalServiceProductionGenerated`: Float (nullable)
  - `percentCompletion`: Float (nullable)

## Usage

### Running the application

1. **Start the application:**
   ```bash
   npm start
   ```

2. **Interact with the models:**
   You can use the Sequelize models in your routes or services to interact with the database.

### Example:
```javascript
const { FinanceData } = require('./models');

// Fetching all finance data entries
FinanceData.findAll().then(data => {
  console.log(data);
});
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss changes.

## License

This project is licensed under the MIT License.

---

Replace `yourusername` in the GitHub link with your actual GitHub username before using the README. This template should provide a good foundation for your project's documentation.