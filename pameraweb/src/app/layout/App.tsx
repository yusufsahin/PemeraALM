import React, { useState, ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import LeftMenu from './LeftMenu';
import TopMenu from './TopMenu';
import Home from '../../features/dashboard/Home';
import Signin from '../../features/auth/Signin';
import NoteList from '../../features/note/NoteList';
import { useAppSelector } from '../store/configureStore';
import ModalManager from '../../features/modal/ModalManager';
import Help from '../_sandbox/Help';
import { ConfigProvider } from 'antd';
import ProjectList from '../../features/project/ProjectList';
import ProjectTable from '../../features/project/ProjectTable';
import ProjectDetailsView from '../../features/project/ProjectsDetailsView';
import Signup from '../../features/auth/Signup';

const { Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const colorBgContainer = '#fff'; // replace with your color
  const { isAuthenticated } = useAppSelector((state) => state.security);

  const toggleCollapse = () => setCollapsed(!collapsed);

  const ContentWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
      }}
    >
      <ModalManager/>
      {children}
    </Content>
  );

  const renderAuthenticatedLayout = () => (
    <Layout>
      <LeftMenu collapsed={collapsed} toggleCollapsed={toggleCollapse} />
      <Layout>
        <TopMenu collapsed={collapsed} toggleCollapsed={toggleCollapse} />
        <ContentWrapper>
          <ModalManager />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects-table" element={<ProjectTable />} />
             <Route path="/projects-details-view" element={<ProjectDetailsView />} />
            <Route path="/notes" element={<NoteList />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </ContentWrapper>
      </Layout>
    </Layout>
  );

  const renderUnauthenticatedLayout = () => (
    <Layout>
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ContentWrapper>
    </Layout>
  );

  return (
    <ConfigProvider>
      {isAuthenticated ? renderAuthenticatedLayout() : renderUnauthenticatedLayout()}
    </ConfigProvider>
  );
};

export default App;
