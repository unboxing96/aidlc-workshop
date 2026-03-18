package com.tableorder.dashboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tableorder.dashboard.dto.StatusChangeRequest;
import com.tableorder.entity.OrderStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.bean.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DashboardController.class)
class DashboardControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @MockBean private DashboardService dashboardService;

    @Test
    void getDashboard_returns200() throws Exception {
        when(dashboardService.getDashboard()).thenReturn(List.of());

        mockMvc.perform(get("/api/admin/dashboard"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void getTableOrders_returns200() throws Exception {
        when(dashboardService.getTableOrders(1L)).thenReturn(List.of());

        mockMvc.perform(get("/api/admin/tables/1/orders"))
                .andExpect(status().isOk());
    }

    @Test
    void changeOrderStatus_returns200() throws Exception {
        var request = new StatusChangeRequest(OrderStatus.PREPARING);

        mockMvc.perform(patch("/api/admin/orders/1/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(dashboardService).changeOrderStatus(1L, OrderStatus.PREPARING);
    }

    @Test
    void deleteOrder_returns200() throws Exception {
        mockMvc.perform(delete("/api/admin/orders/1"))
                .andExpect(status().isOk());

        verify(dashboardService).deleteOrder(1L);
    }

    @Test
    void completeTableSession_returns200() throws Exception {
        mockMvc.perform(post("/api/admin/tables/1/complete"))
                .andExpect(status().isOk());

        verify(dashboardService).completeTableSession(1L);
    }

    @Test
    void getOrderHistory_returns200() throws Exception {
        when(dashboardService.getOrderHistory(eq(1L), any(), any())).thenReturn(List.of());

        mockMvc.perform(get("/api/admin/tables/1/history"))
                .andExpect(status().isOk());
    }
}
