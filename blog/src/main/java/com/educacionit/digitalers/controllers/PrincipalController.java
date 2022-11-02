package com.educacionit.digitalers.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PrincipalController {
	// en vez del RequestMapping y GET 
	  @GetMapping(value = {"/", "/ping"}) // por /ping o por localhost8080 
	  @ResponseBody
	  public ResponseEntity<String> ping() {
	     return ResponseEntity.ok("pong");
	  }
	  
}