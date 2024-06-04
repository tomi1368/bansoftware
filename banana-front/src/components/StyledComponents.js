import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const StyleItem = styled.li`
  text-decoration: none;
  list-style: none;
  color: #333;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
`;

export const Title = styled.h2`
  font-size: 2em;
  color: #333;
  margin: 20px 0;
  text-align: center;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  font-family: Arial, sans-serif;
`;
