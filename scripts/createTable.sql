CREATE TABLE stores (
    id SERIAL PRIMARY KEY,                         
    name VARCHAR(255) NOT NULL,              	   
    is_open BOOLEAN NOT NULL DEFAULT false,        
    latitude DECIMAL(10, 7) NOT NULL,              
    longitude DECIMAL(10, 7) NOT NULL,             
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),   
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()    
);

CREATE INDEX stores_latitude_idx ON public.stores (latitude,longitude);


CREATE EXTENSION IF NOT EXISTS postgis;