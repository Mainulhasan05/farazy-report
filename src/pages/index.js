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
    try {
      // Fetch the first endpoint
      const res1 = await fetch(`${process.env.API}/api/Investigation/GetInvestigations?searchTxt=${invoiceNo}`);
      if (!res1.ok) {
        throw new Error(`Failed to fetch data from ${process.env.API}`);
      }
      const data1 = await res1.json();
      console.log(data1);
  
      // Fetch the second endpoint
      const res2 = await fetch(`${process.env.API}/api/Investigation/GetInvoiceInfo?InvNo=${invoiceNo}`);
      if (!res2.ok) {
        throw new Error(`Failed to fetch data from ${process.env.API}`);
      }
      const data2 = await res2.json();
      console.log(data2);
  
      if (data2.length > 0) {
        setPatient({
          patientName: data2[0].patientName,
          age: data2[0].age,
          telephoneNo: data1?.[0]?.telephoneNo,
          tests: data1?.[0]?.itemDescription,
        });
      }
  
      setTestResults(data2);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const loadTestName = async () => {
  //   const res1=await axios.get(`${process.env.API}/api/Investigation/GetInvestigations?searchTxt=${invoiceNo}`)
  //   console.log(res1.data)
  //   const res = await axios.get(`${process.env.API}/api/Investigation/GetInvoiceInfo?InvNo=${invoiceNo}`)
  //   console.log(res.data)
  //   if(res.data.length>0){
  //     setPatient({
  //       patientName:res.data[0].patientName,
  //       age:res.data[0].age,
  //       telephoneNo:res1?.data[0]?.telephoneNo,
  //       tests:res1?.data[0]?.itemDescription
  //     })     

  //   }

  //   setTestResults(res.data)
  // }
  const loadTestGroup = async () => {
    const res = await axios.get(`${process.env.API}/api/Investigation/GetInvestigationGroupName?InvNo=${invoiceNo}`)
    console.log(res.data)
  }

  useEffect(() => {
    console.log(patient)
  }, [patient])
  

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
                 {testResults.length  > 0 ? <div>
                    <h3>Done Tests</h3>
                    
                    

                 </div>  : 'No Test Found'}
              </div>
              <div className="card-body">

                <div className="row">
                  <div className="col-md-6 col-lg-12">
                    {/* create a table which will contain patients name phone */}
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Test Name</th>
                          <th>Result</th>
                          <th>Unit</th>
                          <th>Reference Range</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          testResults.map((test, index) => (
                            <tr key={index}>
                              <td>{test.shortDesc}</td>
                              <td>{test.result}</td>
                              <td>{test.unit}</td>
                              <td>{test.referenceRange}</td>
                            </tr>
                          ))
                        }
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