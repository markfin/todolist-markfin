import React from 'react';
import {  Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

import  Dashboard from './pages/Dashboard';
import  Item from './pages/Item';

function App() {
	return (
		<Router>
			<Header title="TO DO LIST APP" />
			<Container maxW="5xl">
				<Routes>
					<Route
						path="/"
						element={<Dashboard />}
					/>
					<Route
						path="/item-list/:id"
						element={<Item />}
					/>
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
