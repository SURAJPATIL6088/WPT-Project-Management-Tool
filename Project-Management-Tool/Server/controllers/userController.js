import express from "express";
import { getConnection } from "../db.js";
import { StatusCodes } from "http-status-codes";
const connection = getConnection();


export const getRegisteredUsers = (req, res)=>{
  try {
    const sql = `select id, username, role from users where role='user'`;
    connection.query(sql, (error, result)=>{
      if(error){
        return res.status(StatusCodes.BAD_REQUEST).json({messgae:'Database Error'});
      }
      res.status(StatusCodes.OK).json({message:"List of Registered Users", users:result});
    })
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({messgae:'somethiing went wrong'});
  }
}
