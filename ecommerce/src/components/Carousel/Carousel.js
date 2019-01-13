import React, {Component} from 'react';
import './Carousel.css'

class Carousel extends Component {
    render() {
        return (
            <div>
                <div id="carouselExampleIndicators" className="carousel slide p-0" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        {/*<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>*/}
                    </ol>
                    <div className="carousel-inner p-0">
                        <div className="carousel-item active pl-0">
                            <img src="http://demo.cssmoban.com/cssthemes5/cpts_1528_cnh/img/slider/1.jpg" className="d-block w-100 imageItem" alt="..."/>
                        </div>
                        <div className="carousel-item pl-0">
                            <img src="http://demo.cssmoban.com/cssthemes5/cpts_1528_cnh/img/slider/2.jpg" className="d-block w-100 imageItem" alt="..."/>
                        </div>
                        {/*<div className="carousel-item">*/}
                            {/*<img src="..." className="d-block w-100" alt="..."/>*/}
                        {/*</div>*/}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                       data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                       data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default Carousel;