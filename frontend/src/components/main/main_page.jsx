import React from "react";

import "./main-page.scss"

class MainPage extends React.Component {
  render() {
    return (
      <div className="api-docs">
        <h1>API Documentation</h1>
        <br />
        <h3>Resources</h3>
        <p>/cars</p>
        <p>/images</p>
        <p>/search</p>
        <p>/users</p>
        <br />
        <h3>Routes</h3>
        <div className="api-group">
          <p className="api-title">GET</p>
          <p className="api-route">/cars</p>
        </div>
        <div className="api-group">
          <p className="api-title">GET</p>
          <p className="api-route">/cars/:id</p>
        </div>
        <div className="api-group">
          <p className="api-title">POST</p>
          <p className="api-route">/cars</p>
        </div>
        <div className="api-group">
          <p className="api-title">PATCH</p>
          <p className="api-route">/cars/:id</p>
        </div>
        <div className="api-group">
          <p className="api-title">PATCH</p>
          <p className="api-route">/cars/delete/:id</p>
        </div>
        <div className="api-group">
          <p className="api-title">PATCH</p>
          <p className="api-route">/cars/undelete/:id</p>
        </div>
        <div className="api-group">
          <p className="api-title">PATCH</p>
          <p className="api-route">/cars/buy/:id</p>
        </div>
        <div className="api-group">
          <p className="api-title">PATCH</p>
          <p className="api-route">/cars/addforsale/:id</p>
        </div>
        <div className="api-group">
          <p className="api-title">PATCH</p>
          <p className="api-route">/cars/removeforsale/:id</p>
        </div>
        <div className="api-group">
          <p className="api-title">POST</p>
          <p className="api-route">/users/register</p>
        </div>
        <div className="api-group">
          <p className="api-title">POST</p>
          <p className="api-route">users/login</p>
        </div>
        <div className="api-group">
          <p className="api-title">GET</p>
          <p className="api-route">/users</p>
        </div>
        <div className="api-group">
          <p className="api-title">GET</p>
          <p className="api-route">/users/:id</p>
        </div>
        <div className="api-group">
          <p className="api-title">PATCH</p>
          <p className="api-route">/users/:id</p>
        </div>
        <div className="api-group">
          <p className="api-title">POST</p>
          <p className="api-route">/users/:id/addFollowedCar</p>
        </div>
        <div className="api-group">
          <p className="api-title">GET</p>
          <p className="api-route">/images/:filename</p>
        </div>
        <div className="api-group">
          <p className="api-title">POST</p>
          <p className="api-route">/images</p>
        </div>
        <div className="api-group">
          <p className="api-title">GET</p>
          <p className="api-route">/search/makes/:make</p>
        </div>
        <div className="api-group">
          <p className="api-title">GET</p>
          <p className="api-route">/search/models/:model</p>
        </div>
        <div className="api-group">
          <p className="api-title">GET</p>
          <p className="api-route">/search/years/:year</p>
        </div>
        <div className="api-group">
          <p className="api-title">GET</p>
          <p className="api-route">/search/locations/:location</p>
        </div>
        <div className="api-group">
          <p className="api-title">GET</p>
          <p className="api-route">/search/colors/:color</p>
        </div>
      </div>
    );
  }
}

export default MainPage;
