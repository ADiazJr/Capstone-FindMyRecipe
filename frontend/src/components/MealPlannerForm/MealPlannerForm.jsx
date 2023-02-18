import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MealPlannerForm = ({ show, handleClose, handleAddToMealPlan }) => {
  const [mealType, setMealType] = useState("");

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };

  const handleAddToMealPlanClick = () => {
    handleAddToMealPlan(mealType);
    setMealType("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add to Meal Planner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="mealType">
            <Form.Label>Meal Type</Form.Label>
            <Form.Control as="select" value={mealType} onChange={handleMealTypeChange}>
              <option value="">Select a meal type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddToMealPlanClick} disabled={!mealType}>
          Add to Meal Planner
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MealPlannerForm;
