/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactPlayer from 'react-player'
import Fade from 'react-reveal/Fade'



const Home = () => {


  const [investment, setInvestment] = useState({ initial: '', monthly: '', years: '', yield: '', ready: false })
  const [result, setResult] = useState([])



  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    let input = { ...investment, [name]: value }
    setInvestment(input)

  }

  function handleSubmit(event) {
    event.preventDefault()

    let sum = Number(investment.initial)
    let arr = []

    for (let i = 1; i <= investment.years; i++) {

      let row = {}
      row.year = i
      row.startBalance = sum.toFixed(2)
      row.monthlyContribution = (Number(investment.monthly) * 12).toFixed(2)
      row.reinvested = (sum / Number(investment.yield)).toFixed(2)
      row.endBalance = (sum + (sum / Number(investment.yield)) + Number(investment.monthly) * 12).toFixed(2)
      arr.push(row)

      sum = sum + (sum / Number(investment.yield)) + Number(investment.monthly) * 12
    }

    setInvestment({ ...investment, ['ready']: true })
    setResult(arr)
  }



  console.log(investment)
  console.log(result)
  return <div className="home">

    <div className='player-wrapper'>
      <ReactPlayer playing={true} loop={true} muted={true} url='./video/analysis.mp4' width='100%' height='100%' />
    </div>

    <Fade down>
      <h1 className="title" >Investment Calculator</h1>
    </Fade>

    <form onSubmit={handleSubmit}>

      <Fade right>
        <div className="form-group">
          <input onChange={handleChange} name="initial" value={investment.initial} type="number" className="form-control" id="initialInvestment" placeholder="Initial investment" required />
        </div>
      </Fade>
      <Fade left>
        <div className="form-group">
          <input onChange={handleChange} name="monthly" value={investment.monthly} type="number" className="form-control" id="monthlyContributions" placeholder="Monthly contributions" required />
        </div>
      </Fade>
      <Fade right>
        <div className="form-group">
          <input onChange={handleChange} name="years" value={investment.years} type="number" className="form-control" id="yearsToInvest" placeholder="Years to invest" required />
        </div>
      </Fade>
      <Fade left>
        <div className="form-group">
          <input onChange={handleChange} name="yield" value={investment.yield} type="number" className="form-control" id="averageYield" placeholder="Average yield (%)" required />
        </div>
      </Fade>
      <Fade delay={800}>
        <div className="form-group btn-custom">
          <button type="submit" className="btn btn-primary">Calculate Return</button>
        </div>
      </Fade>


    </form>


    {investment.ready && <div className="results">

      <Fade>
        <table>
          <tbody>
            <tr>
              <th className="table-top">Year</th>
              <th className="table-top">Start Balance</th>
              <th className="table-top">Monthly Contributions</th>
              <th className="table-top">Reinvested</th>
              <th className="table-top">End Balance</th>
            </tr>

            {result.map((year, index) => {
              return <tr key={index}>
                <th className="year" >{year.year}</th>
                <th className="start">{year.startBalance}</th>
                <th className="monthly">{year.monthlyContribution}</th>
                <th className="reinvested">{year.reinvested}</th>
                <th className="end">{year.endBalance}</th>
              </tr>
            })}

          </tbody>
        </table>
      </Fade>

    </div>}











  </div >


}

export default Home





