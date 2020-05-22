import React, { useEffect, useState } from 'react'
import { uuid } from 'uuidv4'

import './styles.css'

function App() {
	const [repos, setRepos] = useState([])

	async function handleAddRepository() {
		setRepos([
			...repos,
			{
				id: uuid(),
				url: 'https://github.com/josepholiveira',
				title: 'Desafio ReactJS',
				techs: ['React', 'Node.js'],
			},
		])
	}

	async function handleRemoveRepository(id) {
		setRepos(repos.filter((repo) => repo.id !== id))
	}

	return (
		<div>
			<ul data-testid='repository-list'>
				{repos.map((repo) => (
					<li key={repo.id}>
						{repo.title}
						<button onClick={() => handleRemoveRepository(repo.id)}>
							Remover
						</button>
					</li>
				))}
			</ul>
			<button onClick={handleAddRepository}>Adicionar</button> <br />
			<button>Remover</button>
		</div>
	)
}

export default App
