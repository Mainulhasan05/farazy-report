import React, { useState } from 'react'
import axios from 'axios'

//  test name api =http://59.152.61.146:6200/api/Investigation/GetInvoiceInfo?InvNo=DIA230904101
// test group api = http://59.152.61.146:6200/api/Investigation/GetInvestigationGroupName?InvNo=DIA230904101
const index = () => {
  const [invoiceNo, setInvoiceNo] = useState('DIA230904101')
  const [testResults, setTestResults] = useState([])

  const loadTestName = async () => {
    const res = await axios.get(`${process.env.API}/api/Investigation/GetInvoiceInfo?InvNo=${invoiceNo}`)
    console.log(res.data)
    setTestResults(res.data)
  }
  const loadTestGroup = async () => {
    const res = await axios.get(`${process.env.API}/api/Investigation/GetInvestigationGroupName?InvNo=${invoiceNo}`)
    console.log(res.data)
  }


  return (
    <>
      <br />
      <div className="text-center container alert">
        <div>
          <h3>Get Your Farazy Tested Report</h3>
          <input onChange={(e) => setInvoiceNo(e.target.value)} type="text" className="form-control form-control-lg mb-3 text-center display-3" placeholder='Invoice No' value={invoiceNo} />
          <button onClick={loadTestName} className="btn btn-success">Get Report</button>
        </div>
        <br />

        {/* Patient's Info */}
        {
          testResults.length > 0 &&
          <div className="row">
          <div className="col-md-6 col-lg-12">
            <div className="card">
              <div className="card-header">
                Patient's Info
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-lg-12">
                    {/* create a table which will contain patients name phone */}
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>{testResults[0]?.patientName}</td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td>01700000000</td>
                        </tr>
                        <tr>
                          <td>Age</td>
                          <td>{testResults[0]?.age}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        }


        {/* Done tests */}
        <div className="row">
          <div className="col-md-6 col-lg-12">
            <div className="card">
              <div className="card-header">
                 Test's Info
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-lg-12">
                    {/* create a table which will contain patients name phone */}
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>Farazy</td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td>01700000000</td>
                        </tr>
                        <tr>
                          <td>Age</td>
                          <td>25</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index