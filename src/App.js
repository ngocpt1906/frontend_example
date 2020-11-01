import React from 'react';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Routes } from "./Routes";
import { MobXProviderContext } from 'mobx-react';
import './App.css';

import { createServer } from "miragejs";

createServer({
  routes() {
    this.posts = [
      { id: "1", title: "Article 1", content: "Goreng wakes in a concrete cell marked with the number 48. His cellmate, Trimagasi, explains that they are in a Vertical Self-Management Center, a tower-style facility in which food is delivered via a platform that travels from the top down, stopping for a fixed period on each floor. Those on lower levels can eat only what those above leave, and the cell is heated or cooled to fatal temperatures if anyone tries to keep any of the food." },
      { id: "2", title: "Article 2", content: "Goreng wakes in a concrete cell marked with the number 48. His cellmate, Trimagasi, explains that they are in a Vertical Self-Management Center, a tower-style facility in which food is delivered via a platform that travels from the top down, stopping for a fixed period on each floor. Those on lower levels can eat only what those above leave, and the cell is heated or cooled to fatal temperatures if anyone tries to keep any of the food." },
      { id: "3", title: "Article 3", content: "Goreng wakes in a concrete cell marked with the number 48. His cellmate, Trimagasi, explains that they are in a Vertical Self-Management Center, a tower-style facility in which food is delivered via a platform that travels from the top down, stopping for a fixed period on each floor. Those on lower levels can eat only what those above leave, and the cell is heated or cooled to fatal temperatures if anyone tries to keep any of the food." },
    ];
    this.get("/posts", () => this.posts);
    this.put("/posts", (schema, request) => {
      let payload = JSON.parse(request.requestBody);
      this.posts.push({ ...payload, ...{ id: Math.random() } });
      return { message: 'success', data: this.posts }
    });
    this.post("/posts/:id", (schema, request) => {
      let payload = JSON.parse(request.requestBody);
      let id = request.params.id
      this.posts = this.posts.filter(e => e.id !== id);
      this.posts.push({ ...payload, ...{ id: id } });
      return { message: 'success', data: this.posts }
    });
    this.delete("/posts/:id", (schema, request) => {
      let payload = JSON.parse(request.requestBody);
      let id = request.params.id
      this.posts = this.posts.filter(e => e.id !== id);
      return { message: 'success', data: this.posts }
    });
    this.post("/auth/login", (schema, request) => {
      let payload = JSON.parse(request.requestBody);
      if (payload.username === "admin" && payload.password === "admin") return { message: 'success' };
      else return { errors: ['Invalid username or password'] };
    });

  },
})

const useStores = () => {
  return React.useContext(MobXProviderContext)
}

const { Header, Sider, Content } = Layout;

function App() {

  const [collapsed, setCollapsed] = useState(false)

  const { rootStore: { authStore } } = useStores()

  const toggle = () => setCollapsed(!collapsed)

  //check if route is login page -> use login layout 
  const isLoginPage = document.location.pathname === "/login";

  useEffect(() => {
    if (authStore.getToken() !== null && document.location.pathname === "/login") document.location.href = "/";
    if (authStore.getToken() === null && document.location.pathname !== "/login") document.location.href = "/login";
  }, []);

  return (
    <div className="App">
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed} hidden={isLoginPage}>
            <div className="logo" />
            <Menu theme="dark" mode="inline">
              {Routes.map(e => <Menu.Item key={e.path} hidden={e.hiddenFromMenu} icon={<UserOutlined />}><Link to={e.path}>{e.name}</Link></Menu.Item>)}
              <Menu.Item key="logout" icon={<UserOutlined />} onClick={authStore.logout}>Logout</Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" hidden={isLoginPage}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle
              })}
            </Header>
            <Content className={isLoginPage ? "site-layout-background" : "site-layout-background content-wrapper"} >
              <Switch>
                {Routes.map(e => <Route key={e.path} path={e.path}>
                  {e.page}
                </Route>)}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  )
}

export default App;
