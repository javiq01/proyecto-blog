package com.educacionit.digitalers.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PrincipalController {
	private static Logger logger = LogManager.getLogger();

	@GetMapping(value = { "/welcome", "/index", "/blog" })
	public String welcome() {
		logger.info("welcome page");
		return "welcome.html";
	}
	
	
	// en vez del RequestMapping y GET 
	  @GetMapping(value = {"/", "/ping"}) // por /ping o por localhost8080 
	  @ResponseBody
	  public ResponseEntity<String> ping() {
		logger.info("ping...");
	     return ResponseEntity.ok("pong");
	  }
	  
}
