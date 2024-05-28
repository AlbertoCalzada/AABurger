import ButtonLink from '../components/buttonLink'
import Testimonial from '../components/testimonial'
import Carousel from '../components/carousel'
import ReservationForm from '../components/reservationForm'
export default function HomePage() {
    return (
        <div>
            <section className="text-gray-600 body-font relative" style={{ backgroundImage: "url('/img/burger_background.jpg')" }}>
            <Carousel />
            <br />

            <div id="reserve" className="mt-10 w-full">
                <ReservationForm />
            </div>

            <Testimonial />
            </section>
        </div>



    )
}