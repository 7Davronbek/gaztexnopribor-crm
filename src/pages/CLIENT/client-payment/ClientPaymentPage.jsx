import click from "@/assets/click.png"
import payme from "@/assets/payme.png"
import cash from "@/assets/cash.png"

const ClientPaymentPage = () => {
    return (
        <div className='ClientPaymentPage ClientSpecialistPage ClientReceiverPage RightStyle'>
            <h1 className='mb-4'>Оплата</h1>
            <div className="row">
                <div className="col-lg-6">
                    <div className="paymentCard">
                        <div className="img"><img src={click} alt=""/></div>
                        <button className="btn myBtn">Оплатить</button>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="paymentCard">
                        <div className="img"><img src={payme} alt=""/></div>
                        <button className="btn myBtn">Оплатить</button>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="paymentCard">
                        <div className="img"><img src={cash} alt=""/></div>
                        <button className="btn myBtn">Оплатить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientPaymentPage;