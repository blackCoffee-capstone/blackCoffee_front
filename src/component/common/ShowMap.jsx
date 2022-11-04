// style
import styled from 'styled-components'

const MapContainer = styled.section`
  .sample_map{
    display: block;
    width: clamp(30rem, 100%, 60rem);
    margin: 0 auto;
  }
`

function ShowMap(props){
  const data = props.data;

  return (
    <MapContainer>
      <section>
        <img className='sample_map' src={require("assets/image/ShowMap/korea_map.jpg")} alt="한국 지도" />
      </section>
    </MapContainer>
  )
}

export default ShowMap;