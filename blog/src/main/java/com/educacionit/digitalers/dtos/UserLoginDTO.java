package com.educacionit.digitalers.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginDTO {

	@Email(message = "El Email debe ser un tipo Correo Electronico")
	@NotEmpty(message = "Se debe enviar el correo[email]")
	private String email;
	
	@NotEmpty(message = "Se debe enviar la clave[key]")
	private String key;
}
