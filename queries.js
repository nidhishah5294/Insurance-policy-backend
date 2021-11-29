const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'nidhi',
  port: 5432,
})

const getInsurancePolicyDetails = (request, response) => {
  pool.query('SELECT * FROM insurance_policy', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const insurancePolicyDetailsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM insurance_policy WHERE policy_number = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createInsurancePolicyDetails = (request, response) => {
  const { policy_start_date, policy_end_date, policy_description, customer_first_name, customer_surname, customer_date_of_birth } = request.body

  pool.query('INSERT INTO insurance_policy ( policy_start_date,policy_end_date,policy_description,customer_first_name,customer_surname,customer_date_of_birth) VALUES ($1, $2,$3,$4,$5,$6)', [policy_start_date, policy_end_date, policy_description, customer_first_name, customer_surname, customer_date_of_birth], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added successfully`)
  })
}

const updateInsurancePolicyDetail = (request, response) => {

  const { policy_number, policy_start_date, policy_end_date, policy_description, customer_first_name, customer_surname, customer_date_of_birth } = request.body
  const values = [policy_start_date, policy_number, policy_end_date, policy_description, customer_first_name, customer_surname, customer_date_of_birth]
  pool.query(
    'UPDATE insurance_policy SET policy_start_date = $1,policy_end_date = $3,policy_description = $4,customer_first_name = $5,customer_surname = $6,customer_date_of_birth=$7 WHERE policy_number = $2', values, (error, res) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${policy_number}`)
    });
}
const deleteInsurancePolicyDetail = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM insurance_policy WHERE policy_number = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}}`)
  })
}

module.exports = {
  getInsurancePolicyDetails,
  insurancePolicyDetailsById,
  createInsurancePolicyDetails,
  updateInsurancePolicyDetail,
  deleteInsurancePolicyDetail,
}