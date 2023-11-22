import React, { useState } from 'react';
import { Button, ListGroup, Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// defining PricingRules that calculation rely on
export const pricingRules = {
  A: { unit_price: 60, special_price: { quantity: 3, price: 150 } },
  B: { unit_price: 30, special_price: { quantity: 2, price: 45 } },
  C: { unit_price: 30 },
  D: { unit_price: 25 },
};

const Checkout = () => {
  const [items, setItems] = useState({}); // useState hook to update the state with the calculation

  const scan = (item) => {
    if (!pricingRules[item]) {
      // checks that the item exists on pricingRules above
      console.log(`Item '${item}' not found in pricing rules.`); // if not found then log the error message in the console
      return;
    }
    // if the item exists then do the following
    setItems((prevItems) => {
      const updatedItems = { ...prevItems }; // update the state based on the previous items
      updatedItems[item] = (updatedItems[item] || 0) + 1; // if item exists in updatedItems then it increments its value and if not it creates a new item
      return updatedItems;
    });
  };

  // this function calculates the total of the scanned items
  const calculateTotal = () =>
    Object.keys(items) // returns an array of items names that are present in the items array
      .filter((item) => pricingRules[item]) // filter by the items names that only exist in PricingRules
      .reduce(
        //reduce is used to calculate the total price by iterating through the keys, and calculate the price of each item using calculateItems function.
        (total, item) => total + calculateItemPrice(item, items[item]),
        0
      );

  const calculateItemPrice = (item, quantity) => {
    let price = 0; // Initializes the price variable to 0, which will hold the calculated price for the item

    // condition to check wether the item has special pricing defined in the 'pricingRules
    if (pricingRules[item]['special_price']) {
      // using destructuring to get the properties from the 'pricingRules' object that has special price.
      const { special_price: specialPrice, unit_price: unitPrice } =
        pricingRules[item];
      const { quantity: specialQuantity, price: specialOffer } = specialPrice;

      const specialCount = Math.floor(quantity / specialQuantity); //  calculates how many times the special offer can be applied entirely.
      const remainingCount = quantity % specialQuantity; // calculates the remaining quantity after the special offer has applied.

      price += specialCount * specialOffer; // increment 'price' with the cost of items that qualify for the special offer entirely.
      price += remainingCount * unitPrice; // increment 'price' with the cost of remaining items.
    } else {
      // if not in specialPrice then
      price += quantity * pricingRules[item]['unit_price']; // increment 'price' with the cost of the items.
    }

    return price; // returns total price
  };

  return (
    <Container>
      <Row>
        <h1 className='mt-4 text-center'>
          Welcome to the <strong className='text-danger'>redstor </strong>
          Supermarket checkout system
        </h1>
        <h4 className='mt-4 text-center'>We have an amazing WEEKLY OFFERS </h4>

        <Col>
          <Table striped border size='sm'>
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>60</td>
              </tr>
              <tr>
                <td>B</td>
                <td>30</td>
              </tr>
              <tr>
                <td>C</td>
                <td>30</td>
              </tr>
              <tr>
                <td>D</td>
                <td>25</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <h4 className='text-center'>Checkout this week's offer</h4>
          <Table striped border size='sm'>
            <thead>
              <tr>
                <th className='text-center'>Special Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='text-center'>3 items A For 150</td>
              </tr>
              <tr>
                <td className='text-center'>2 items B For 45</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className='mt-4 justify-content-center'>
        <Col xs={12} sm={6} md={3} className='text-center mb-3'>
          <Button variant='success' onClick={() => scan('A')}>
            Scan Item A
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className='text-center mb-3'>
          <Button variant='success' onClick={() => scan('B')}>
            Scan Item B
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className='text-center mb-3'>
          <Button variant='success' onClick={() => scan('C')}>
            Scan Item C
          </Button>
        </Col>
        <Col xs={12} sm={6} md={3} className='text-center mb-3'>
          <Button variant='success' onClick={() => scan('D')}>
            Scan Item D
          </Button>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col>
          <h2>Items Scanned:</h2>
          <ListGroup>
            {Object.keys(items).map((item) => (
              <ListGroup.Item key={item}>
                {item}: {items[item]}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {Object.keys(items).length > 0 ? (
            <Button
              className='mt-5'
              variant='danger'
              onClick={() => setItems({})}
            >
              Clear Items
            </Button>
          ) : null}
        </Col>
        <Col className='text-center'>
          <h2>Total Price:</h2>
          <p>{calculateTotal()}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
