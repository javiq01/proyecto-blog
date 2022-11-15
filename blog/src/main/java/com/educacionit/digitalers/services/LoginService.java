package com.educacionit.digitalers.services;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.educacionit.digitalers.entities.Login;
import com.educacionit.digitalers.entities.User;
import com.educacionit.digitalers.repositories.UserRepository;

@Service
public class LoginService {
	private static Logger logger = LogManager.getLogger();

	private static Map<UUID, Login> loggedUsers = new ConcurrentHashMap<>();

	@Value("${login.expiresIn}")
	private Long expiresIn;

	@Value("${login.type}")
	private String type;

	@Value("${login.credential}")
	private String credential;

	@Autowired
	private UserRepository userRepository;
	
	
	public Login getLogin(String mail) {
		UUID uuid = UUID.randomUUID();
		Login login = Login.builder().uuid(uuid).creationDate(LocalDateTime.now()).expiresIn(expiresIn).type(type).credential(credential).email(mail).build();

		loggedUsers.put(uuid, login);
		logger.info(loggedUsers);
		return login;
	}
	
	
	public Boolean validateLogin(String uuidHeader) {
		UUID uuid = null;
		try {
			uuid = UUID.fromString(uuidHeader);
		} catch (IllegalArgumentException e) { 
			return false;
		}
		Login login = loggedUsers.get(uuid);
		
		logger.info(uuid);
		logger.info(login);
		if (login != null) {
			LocalDateTime now = LocalDateTime.now();			
			Long timeSession = ChronoUnit.MILLIS.between(login.getCreationDate(), now);
			logger.info(login.getCreationDate() + " - " + now + " : " + timeSession);
			if (timeSession <= expiresIn) {
				login.setCreationDate(now);
				return true;
			}
			loggedUsers.remove(uuid);
		}
		return false;
	}
	
	public User getUser(String uuidHeader) {
		UUID uuid = null;
		try {
			uuid = UUID.fromString(uuidHeader);
		} catch (IllegalArgumentException e) {
			return null;
		}
		Login login = loggedUsers.get(uuid);

		logger.info(uuid);
		logger.info(login);

		if (login != null) {
			LocalDateTime now = LocalDateTime.now();
			Long timeSession = ChronoUnit.MILLIS.between(login.getCreationDate(), now);
			logger.info(login.getCreationDate() + " - " + now + " : " + timeSession);
			if (timeSession <= expiresIn) {
				login.setCreationDate(now);
				User user = userRepository.findByEmail(login.getEmail()).orElse(null);
				logger.info("USUARIO: " + user);
				return user;
			}
			loggedUsers.remove(uuid);
		}
		return null;
	}
	
}
