CONSTRAINT fk_alumnos_años 
FOREIGN KEY (id_años_fk) 
REFERENCES años(id_años)
ON DELETE NULL
ON UPDATE CASCADE;
 