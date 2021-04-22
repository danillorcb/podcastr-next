import { GetStaticProps } from 'next';

export default function Home(props) {
  // SPA - Não aparece na indexação do Google
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }, []);

  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

// SSG - Static Site Generation
// Para que não faça uma nova requisição toda vez que alguém acessar a página,
// assim como é feito no SSR - Server Side Rendering
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8 // atualiza a cada 8 horas
  }
}
