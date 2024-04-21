import ButtonLink from '../components/buttonLink'
import Testimonial from '../components/testimonial'
import Carousel from '../components/carousel'

export default function HomePage() {
    return (
        <div>
            <Carousel/>
            <br />
            <ButtonLink href="/register" style="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-5">
                Registrate
            </ButtonLink>
            <ButtonLink href="/login" style="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-5">
                Inicio de Sesión
            </ButtonLink>

            <Testimonial/>
        

        
        </div>



    )
}