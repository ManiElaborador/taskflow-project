package com.example.taskflow_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestHeader;

import org.springframework.web.bind.annotation.GetMapping;
import com.example.taskflow_project.nodel.User;
import com.example.taskflow_project.jwt.JwtUtil;
import com.example.taskflow_project.repository.UserRepository;

@RestController
@CrossOrigin("*")
	 
	public class HelloContoller {
	@Autowired
	private JwtUtil jwtUtil;
	    @Autowired
	    private UserRepository userRepository;

	    @Autowired
	    private BCryptPasswordEncoder passwordEncoder;

	    @PostMapping("/register")
	    public String registerUser(@RequestBody User user) {
	    	 User existingUser =
	    	            userRepository.findByEmail(user.getEmail());

	    	    if (existingUser != null) {

	    	        return "Email Already Exists";

	    	    }


	        String encryptedPassword =
	                passwordEncoder.encode(user.getPassword());

	        user.setPassword(encryptedPassword);

	        		userRepository.save(user);
	    	        return "User registered";


	    }

	    @PostMapping("/login")
	    public String loginUser(@RequestBody User user) {

	        User existingUser =
	                userRepository.findByEmail(user.getEmail());

	        if (existingUser == null) {

	            return "User Not Found";

	        }

	        boolean passwordMatch =
	                passwordEncoder.matches(
	                        user.getPassword(),
	                        existingUser.getPassword()
	                );

	        if (passwordMatch) {

	            String token =
	                    jwtUtil.generateToken(user.getEmail());

	            return token;

	        } else {

	            return "Wrong Password";

	        }

	    }

		/*
		 * @GetMapping("/dashboard") public String dashboard(
		 * 
		 * @RequestHeader("Authorization") String token ) {
		 * 
		 * token = token.substring(7);
		 * 
		 * String email = jwtUtil.extractEmail(token);
		 * 
		 * return "Welcome " + email;
		 * 
		 * }
		 */
	    @GetMapping("/dashboard")
	    public String dashboard() {

	        return "Protected Dashboard API";

	    }

	}