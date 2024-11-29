export const HomePage = () => {
	const handleClick = async () => {
		const response = await fetch('/api/');
		console.log('==================');
		console.log('response', await response.json());
		console.log('==================');
	};

	return (
		<div>
			<h1>Home</h1>
			<button
				className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
				onClick={handleClick}
			>
				fetch
			</button>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores
				ea earum eveniet exercitationem illo iusto nobis numquam obcaecati quas,
				quos sint, sunt temporibus! Aliquam culpa dolor ducimus eius error esse
				eum eveniet explicabo incidunt iure laudantium libero molestias nam
				neque nesciunt obcaecati officia omnis, saepe similique tempora tempore
				ut veniam vero vitae voluptas? Accusantium adipisci alias aliquam aut
				consequatur, dicta distinctio enim exercitationem facilis fugit harum in
				ipsa maiores natus neque nobis obcaecati officiis possimus quam quis quo
				sed sint totam ut veniam vitae, voluptates, voluptatum! A aliquam
				commodi dicta dolore dolorum error eum eveniet itaque, laudantium,
				numquam perspiciatis porro quasi quia reprehenderit similique sint
				soluta. Accusamus dolorem fuga non praesentium quia? Alias aliquid
				dolore est inventore minima provident qui ullam, vero? Accusamus
				architecto corporis, dignissimos dolore eos ipsa maiores minima minus
				obcaecati possimus quibusdam quidem quo rem repudiandae rerum vero
				voluptas! Accusamus dolor laudantium mollitia natus pariatur perferendis
				provident voluptatum? Ea ipsa libero qui. Aut cum, delectus, facere hic
				iste iusto magni placeat quibusdam, quisquam quod vel veniam.
				Consequuntur cupiditate distinctio enim eum ex fuga illo, magnam
				mollitia ut vero. Ab accusantium aliquid asperiores aspernatur atque
				autem commodi cumque deleniti dignissimos dolor dolore ea eaque eius eos
				esse eum exercitationem harum illo illum incidunt ipsa itaque labore
				minima natus necessitatibus nobis numquam obcaecati, officia officiis
				pariatur quae tempora unde velit veritatis, voluptates voluptatibus
				voluptatum. Blanditiis debitis distinctio est neque numquam voluptate.
				Accusamus consectetur culpa deserunt, eius est fugiat, harum illo
				incidunt iste laboriosam natus nemo non quasi tenetur voluptate? A
				debitis distinctio facilis id labore, nemo, nesciunt obcaecati odio
				placeat repellendus saepe tempore ut, voluptate? Accusamus consequatur
				ex non veniam. Ab alias excepturi obcaecati voluptate! Ipsa ipsum nisi
				obcaecati odit quasi quo reprehenderit veritatis. Adipisci alias autem,
				commodi deleniti deserunt dolorum ducimus est eveniet excepturi facilis
				fuga fugiat fugit incidunt, ipsa iste iusto molestias neque odit, optio
				quasi ratione recusandae repudiandae saepe tempore temporibus velit
				vero? Adipisci aspernatur culpa enim facilis illo itaque modi, natus
				nobis possimus quam quos temporibus vel. Excepturi nemo quia repudiandae
				ut! Esse maxime non nostrum quas quia sed vitae. Alias aliquam expedita
				molestiae neque officiis, qui veritatis voluptatum. A ab architecto
				asperiores, autem dolore dolores ea earum eius enim ex exercitationem
				facilis harum impedit in laborum molestiae mollitia obcaecati odio
				officia perspiciatis praesentium quia quisquam repellendus unde
				voluptas? Aliquam blanditiis dolores error ipsam magni minus nobis optio
				perferendis quos vero? A dolores inventore odio possimus quisquam. Animi
				asperiores dignissimos dolorem, eaque, eos est modi necessitatibus neque
				nobis quam ratione recusandae reprehenderit sapiente soluta ut vel
				veniam vitae, voluptatem. A accusantium alias aliquid aperiam delectus
				dicta distinctio ea eaque esse eveniet, ex in ipsa ipsam iste minima
				mollitia natus necessitatibus nobis provident quibusdam quidem quisquam
				quos reiciendis repellendus sapiente suscipit veniam vero voluptas
				voluptatibus voluptatum. Aliquid iusto neque nulla omnis quas quis quo
				quod, voluptatum! Aliquid, architecto beatae culpa cum doloribus eaque
				explicabo facere magnam minima, molestiae molestias natus nostrum
				praesentium qui quos, tempora ut velit vitae? Consequuntur deserunt
				eaque id impedit ipsa ipsam labore magni, maxime odio officia placeat
				quasi qui quibusdam, quos saepe sequi similique, tempore veritatis.
				Aperiam assumenda at beatae cumque delectus deleniti dicta dignissimos
				dolore dolorum ducimus eius eveniet harum hic inventore iusto libero
				minus nam necessitatibus nobis odio officiis praesentium, quidem quis
				sit suscipit tempora tenetur totam ut veniam voluptatem. Aut, autem
				consectetur debitis deserunt earum excepturi fuga harum, laudantium
				maiores omnis placeat quas quibusdam quis quod reiciendis. Accusamus
				consequatur corporis ducimus est, illo incidunt ipsa, ipsam iure, iusto
				laboriosam natus officiis perferendis possimus praesentium sint sit
				tempore tenetur? Aliquid cumque cupiditate dolores esse est maiores
				natus possimus rem sit. Atque placeat quia saepe? Ad aut doloribus eaque
				harum odit perferendis sequi veniam. Amet aspernatur at culpa dolorem
				earum esse eveniet facilis impedit in ipsa, ipsum iure labore libero
				magni modi molestiae molestias natus nulla obcaecati porro quae qui quod
				ratione reiciendis repellat reprehenderit sit vel. Accusamus at dolor ex
				facere libero obcaecati quas qui quis, sapiente? Amet debitis deserunt
				ea ex illo minima odit quidem, rem voluptas voluptatibus. Ab assumenda
				commodi consequatur cum cumque eveniet explicabo fuga incidunt itaque
				iure, nesciunt nisi, nulla odio omnis pariatur repellendus, saepe sint
				sit veritatis vero! Explicabo fugiat fugit inventore ipsa officiis,
				rerum sequi sint veritatis voluptatum? Ab cupiditate dolore doloribus
				expedita id ipsam ipsum saepe totam ullam voluptas! Beatae distinctio
				dolor esse facere ipsum magnam pariatur similique sunt vitae voluptate.
				Ad architecto autem consequuntur dicta, dolores eaque eius eum hic non,
				omnis tempora veritatis voluptatibus voluptatum. Consectetur dolorum
				obcaecati porro praesentium ratione rerum temporibus veniam. Aperiam
				beatae consectetur cupiditate deleniti doloremque est ex fugiat in,
				inventore ipsum nam perspiciatis quae quam quibusdam quidem quis sed
				sint sunt ullam voluptatem. Aspernatur culpa illum, molestias quo quod
				temporibus ullam unde voluptate? Consequatur culpa delectus deserunt
				impedit iste iusto, quia quidem tempora. Consectetur eos minima nihil
				nisi odit officia saepe sequi vel voluptatum. Accusantium assumenda
				consectetur delectus expedita laborum! Accusamus ducimus eius ipsam,
				obcaecati porro praesentium quod reiciendis. Aliquid autem consequuntur
				debitis id ipsam iusto magnam nam nostrum, numquam officia optio
				perferendis perspiciatis quo sapiente sunt temporibus veritatis. Beatae
				earum eligendi et facere ipsam itaque nulla officiis omnis tempore? Aut
				eligendi exercitationem, fuga illum maiores nam natus nemo non odio
				officiis recusandae sequi ut? Aperiam architecto aspernatur assumenda,
				atque, consectetur consequatur, corporis debitis delectus doloribus illo
				libero minima necessitatibus neque nulla possimus ratione recusandae
				repellendus sunt tempora temporibus. Ad aperiam consequatur delectus
				deserunt dolores, ducimus facere fugiat illo impedit in inventore ipsa
				iusto nostrum omnis optio! Accusamus ad alias dolorum eum facilis,
				inventore ipsum laudantium maxime optio recusandae reiciendis tempora
				temporibus! Alias cum dignissimos est, et id iste molestias mollitia
				nemo non officiis omnis perferendis praesentium quidem suscipit
				veritatis? Aliquid exercitationem natus similique! A ab accusantium ad
				consectetur consequuntur, delectus deserunt dignissimos dolorem dolorum
				ducimus eveniet exercitationem ipsum laborum laudantium mollitia natus
				nobis nulla numquam, odio quas quia repudiandae suscipit tempore ullam
				veniam vero voluptas voluptatem. Corporis et exercitationem fugiat ipsa
				nihil odio, praesentium, provident quod saepe similique, vero voluptate
				voluptatem? Accusantium, repellendus, veritatis?
			</p>
		</div>
	);
};
