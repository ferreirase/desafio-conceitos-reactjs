import React, { useEffect, useState } from 'react'
import api from './services/api'
import { uuid } from 'uuidv4'

import './styles.css'

function App() {
	const [repositories, setRepositories] = useState([])
	const [id, setId] = useState(repositories.length)

	useEffect(() => {
		api.get('repositories').then((response) => setRepositories(response.data))
		setId(repositories.length)
	}, [repositories])

	async function handleAddRepository() {
		const newRepo = {
			id: uuid(),
			title: `Projeto adicionado ${id + 1}`,
			url: 'https://github.com/ferreirase',
			techs: ['Java', 'PHP'],
		}
		setId(id + 1)
		const response = await api.post('/repositories', newRepo)
		setRepositories([...repositories], response.data)
	}

	async function handleRemoveRepository(id) {
		const repoDeleted = await api.delete(`repositories/${id}`)

		setRepositories(repositories.filter((repo) => repo.id !== repoDeleted.id))
	}

	return (
		<>
			<div>
				<ul data-testid='repository-list'>
					{repositories.map((repo) => (
						<li key={repo.id}>
							{repo.title}
							<button onClick={() => handleRemoveRepository(repo.id)}>
								Remover
							</button>
						</li>
					))}
				</ul>
			</div>
			<button onClick={handleAddRepository}>Adicionar</button>
		</>
	)
}

export default App
