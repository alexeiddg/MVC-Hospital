package com.alexeiddg.mvcproject.db;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class dbConnect {
    private static final String URL = "jdbc:postgresql://aws-0-us-west-1.pooler.supabase.com:6543/postgres?user=postgres.urgsmsgmrukvxotplwsy&password=!Welcome12345!";
    private static final String USER = "admin";
    private static final String PASSWORD = "!Welcome12345!";

    public static Connection connect() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Connected to the PostgreSQL database!");
        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
        }
        return conn;
    }

    public static void main(String[] args) {
        connect(); // Test the connection
    }
}
