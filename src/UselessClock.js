import React, { Component } from 'react';

class UselessClock extends Component
{
    constructor()
    {
        super();
        this.state = 
        {
          apiUri: 'http://worldtimeapi.org/api/timezone/',
          local: '',
          current: [],
          times: []
        };
    }

    componentDidMount()
    {
      const localUri = this.state.apiUri.concat(Intl.DateTimeFormat().resolvedOptions().timeZone.toString());

      Promise.all([ fetch(this.state.apiUri), fetch(localUri) ])
        .then(([r1, r2]) =>
            {
                return Promise.all([ r1.json(), r2.json() ]);
            })
        .then(([times, current]) => 
            {
              this.setState({times: times});
              const currJ = JSON.parse(JSON.stringify(current, ['timezone', 'datetime'])); //why elements in this object can't be manipulated like strings?
              const a = JSON.stringify(currJ.timezone).split('/')[1]; //workaround
              const b = JSON.stringify(currJ.datetime).split('T')[1];
              const currA = [a.substring(0, a.length-1), b.substring(0, 8)]; 
              this.setState({current: currA});
            }); 
    }

    handleTimeChange(e)
    {
      const currUri = this.state.apiUri.concat(e.target.value.toLowerCase());
      fetch(currUri)
      .then(response =>
          {
              return response.json();
          })
      .then(time => 
          {
            const currJ = JSON.parse(JSON.stringify(time, ['timezone', 'datetime'])); //why elements in this object can't be manipulated like strings?
            const a = JSON.stringify(currJ.timezone).split('/')[1]; //workaround
            const b = JSON.stringify(currJ.datetime).split('T')[1];
            const currA = [a.substring(0, a.length-1), b.substring(0, 8)]; 
            this.setState({current: currA});
          });
    }

    render()
    {
      return(
        <div id="Container" className="container-sm">
          <div id="Header" className="row">
            <h1 className="display-1">A Useless Clock</h1>
          </div>
          
          <hr />
          
          <div id="CurrentTime" className="row">
            <p>Nel fuso {this.state.current[0]} sono le {this.state.current[1]}</p>
          </div>

          <hr />
          
          <div id="TimeZones" className="row">
            <form name="SelectTimeZone" onChange={(e) => this.handleTimeChange(e)}>
              <label>
                <p className="small">Scegli il tuo fuso orario</p>
                <select name="TimeZone" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                <option defaultValue>Seleziona...</option>
                  {
                    this.state.times.map( (time) => (
                      <option key={time.toString()} value={time.toString()}>{time.toString()}</option>
                    ))
                  }
                </select>
              </label>
            </form>
          </div>
        </div>
      );
    }
}

export default UselessClock;