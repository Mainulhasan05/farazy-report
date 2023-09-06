import React, { useEffect, useState } from 'react'
import axios from 'axios'
// get pone number=http://59.152.61.146:6200/api/Investigation/GetInvestigations?searchTxt=DIA230904105
//  telephoneNo
//  test name api =http://59.152.61.146:6200/api/Investigation/GetInvoiceInfo?InvNo=DIA230904101
// test group api = http://59.152.61.146:6200/api/Investigation/GetInvestigationGroupName?InvNo=DIA230904101
const index = () => {
  const [patient, setPatient] = useState(null)
  const [invoiceNo, setInvoiceNo] = useState('DIA230904101')
  const [testResults, setTestResults] = useState([])

  const loadTestName = async () => {
    const res1=await axios.get(`${process.env.API}/api/Investigation/GetInvestigations?searchTxt=${invoiceNo}`)
    console.log(res1.data)
    const res = await axios.get(`${process.env.API}/api/Investigation/GetInvoiceInfo?InvNo=${invoiceNo}`)
    console.log(res.data)
    if(res.data.length>0){
      setPatient({
        patientName:res.data[0].patientName,
        age:res.data[0].age,
        telephoneNo:res1?.data[0]?.telephoneNo,
        tests:res1?.data[0]?.itemDescription
      })
      // also set telephone no from res1
      // setPatient({...patient,telephoneNo:res1.data.telephoneNo,tests:res1.itemDescription})
      // append with previous data
      

    }

    setTestResults(res.data)
  }
  const loadTestGroup = async () => {
    const res = await axios.get(`${process.env.API}/api/Investigation/GetInvestigationGroupName?InvNo=${invoiceNo}`)
    console.log(res.data)
  }

  useEffect(() => {
    console.log(patient)
  }, [patient])
  

  return (
    <>
    <head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </head>
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
          testResults.length  > 0 && patient &&
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
                          <td>{patient?.patientName}</td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td>{patient?.telephoneNo}</td>
                        </tr>
                        <tr>
                          <td>Age</td>
                          <td>{patient?.age}</td>
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