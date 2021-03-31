import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import {
    Container,
    Title,
    Filter,
    Form,
    Search,
    Header,
    Item,
    HeaderCar,
    TitleCar,
    Price
} from './styles';

import NavBar from '../../components/NavBar';
import Datepicker from '../../components/Datepicker'
import Select from '../../components/SimpleSelect';

import Lambo from '../../assets/Lambo.png';
import Energia from '../../assets/icons/Energia.svg';

import api from '../../services/api'

interface Listing {
    price: Number;
    vehicle: {
        manufacturer: string,
        model: string,
    };
    startDate: Date;
    endDate: Date;
}

interface ListingFormData {
    startDate: Date;
    endDate: Date;
    price?: string
    fuel?: string,
    transmission?: string,
}

const Home: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const [listings, setListings] = useState<Listing[]>([])
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [priceStart, setPriceStart] = useState<number>(0)
    const [priceEnd, setPriceEnd] = useState<number>(0)

    const [switchListing, setSwitchListing] = useState<number>(0)

    useEffect(() => {
        async function loadListing() {
            await api.get('getListings').then(response => {
                if(switchListing === 0)
                    setListings(response.data)
            })
        }
        loadListing()
    })

    const handleSubmit = useCallback(
        async (data: ListingFormData) => {
          try {
            formRef.current?.setErrors({});

            setSwitchListing(1)
            
            const parseStartDate = format(data.startDate, 'MM/dd/yyyy')
            const parseEndDate = format(data.endDate, 'MM/dd/yyyy')
            
            switch (data.price) {
                case '0':
                    setPriceStart(50)
                    setPriceEnd(100)
                    break;

                case '1':
                    setPriceStart(100)
                    setPriceEnd(150)
                    break;

                case '2':
                    setPriceStart(150)
                    setPriceEnd(200)
                break;
                
                case '3':
                    setPriceStart(200)
                    setPriceEnd(250)
                    break;
                    
                case '4':
                    setPriceStart(250)
                    setPriceEnd(1000)
                    break;
                    
                default:
                    break;
            }

            await api.post('getListingsOnRequestedRange', {
                startDate: parseStartDate,
                endDate: parseEndDate,
                fuel: data.fuel,
                transmission: data.transmission,
                priceStart: priceStart,
                priceEnd: priceEnd
            }).then(response => {
                setListings(response.data)
            })
          } catch (error) {
            console.log(error)
          }
        },
        [priceStart, priceEnd],
    );

    console.log(listings)

    return (
        <Container>
        <NavBar/>

        <Form ref={formRef} onSubmit={handleSubmit}>
            <Header>
                <h1>Escolha uma data e encontre os carros disponíveis</h1>

                <div className="date">
                    <div className="de">
                        <Datepicker
                            name="startDate"
                            labelName="De"
                            onChange={(value: Date) => setStartDate(value)}
                            selected={startDate}
                            placeholderText="Selecione uma data"
                            required={true}
                        />
                    </div>

                    <div className="ate">
                        <Datepicker
                            name="endDate"
                            labelName="Até"
                            onChange={(value: Date) => setEndDate(value)}
                            selected={endDate}
                            placeholderText="Selecione uma data"
                            required={true}
                        />
                    </div>
                </div>
            </Header>

            <Title>
                <h1>Resultados</h1>
                <span>{listings.length} Carros</span>
            </Title>
            <Filter>
                <h2>
                    Filtros:
                </h2>
                <Search>
                    <Select
                        name="price"
                        label="Preço ao dia"
                        placeholder="Selecione"
                        options={[
                            { value: '0', label: 'R$ 50 - R$ 100' },
                            { value: '1', label: 'R$ 100 - R$ 150' },
                            { value: '2', label: 'R$ 150 - R$ 200' },
                            { value: '3', label: 'R$ 200 - R$ 250' },
                            { value: '4', label: 'Acima de R$ 250' },
                        ]}
                    />

                    <Select
                        name="fuel"
                        label="Combustível"
                        placeholder="Selecione"
                        options={[
                            { value: 'Gasolina', label: 'Gasolina' },
                            { value: 'Elétrico', label: 'Elétrico' },
                            { value: 'Álcool', label: 'Álcool' },
                        ]}
                    />

                    <Select
                        name="transmission"
                        label="Transmissão"
                        placeholder="Selecione"
                        options={[
                            { value: 'Automático', label: 'Automático' },
                            { value: 'Manual', label: 'Manual' },
                        ]}
                    />

                    <button type="submit">
                        Confirmar
                    </button>

                </Search>
            </Filter>
        </Form>

        

        <main>
            {listings.map(listing => (
                <Link to="/details">
                    <Item>
                        <HeaderCar>
                            <TitleCar>
                                <span>{listing.vehicle?.manufacturer}</span>
                                <strong>{listing.vehicle?.model}</strong>
                            </TitleCar>

                            <Price>
                                <span>AO DIA</span>
                                <strong>{listing.price}</strong>
                            </Price>
                        </HeaderCar>

                        <img className="car" alt={listing.vehicle.model} src={Lambo} />
                        <img className="energy" alt="Energy" src={Energia} />
                    </Item>
                </Link>
            ))}
        </main>
    </Container>
    );
}

export default Home;