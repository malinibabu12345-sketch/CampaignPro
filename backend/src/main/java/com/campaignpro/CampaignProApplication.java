package com.campaignpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CampaignProApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampaignProApplication.class, args);
	}

}
